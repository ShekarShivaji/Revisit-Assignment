const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // <--- Added CORS package

const app = express();

app.use(cors());               // <--- Enable CORS for all origins
app.use(express.json());

const dbPath = path.join(__dirname, 'goodreads.db');
const db = new sqlite3.Database(dbPath);

// Categories data with real URLs
const categories = [
  { name: "Summer Clothes", img: "https://res.cloudinary.com/dqkjtjb9x/image/upload/v1744555700/download_1_dmkatx.jpg", count: 26 },
  { name: "Winter Wear", img: "https://res.cloudinary.com/dqkjtjb9x/image/upload/v1744555872/download_2_fp8yxb.jpg", count: 15 },
  { name: "Accessories", img: "https://res.cloudinary.com/dqkjtjb9x/image/upload/v1744555897/images_rkedwn.jpg", count: 40 },
  { name: "Sports", img: "https://www.tencom.com/hubfs/sports-1.jpeg", count: 10 },
  { name: "Footwear", img: "https://new.ephotovn.com/wp-content/uploads/2019/11/02-2.jpg", count: 35 },
  { name: "Electronics", img: "https://www.seekpng.com/png/full/774-7744281_samsung-electronics-samsung-electronic-product-png.png", count: 50 },
  { name: "Books", img: "http://thrivethinking.com/wp-content/uploads/2019/12/10BooksServiecDesign_1.jpg", count: 60 },
  { name: "Toys", img: "https://qualityinspection.org/wp-content/uploads/2019/10/CPSIAfortoysandproductsforchildren.jpg", count: 45 },
  { name: "Home Decor", img: "https://whiteteak.com/media/catalog/product/d/c/dc65-10025_6_.jpg", count: 33 },
  { name: "Furniture", img: "https://www.darran.com/wp-content/uploads/2025/02/Felix_HPH_1.jpg", count: 22 },
  { name: "Beauty", img: "https://fashionmingle.com/wp-content/uploads/2021/07/beauty-4993472_1920-e1635781134472.jpg", count: 19 },
  { name: "Food & Drinks", img: "https://s7d1.scene7.com/is/image/KeminIndustries/shutterstock_519547867?$responsive$", count: 12 },
  { name: "Health & Fitness", img: "https://images.dickssportinggoods.com/marketing/DSG_FIT_8799634_CLP_STEPRGOLaunchUpdate_0224_S1.jpg", count: 28 },
  { name: "Automotive", img: "https://thejagroup.com/sites/default/files/styles/large_3_2/public/images/ThinkstockPhotos-516686716.jpg?h=ae0ce566&itok=E6aZ9Jzg", count: 21 },
  { name: "Gaming", img: "https://www.asus.com/campaign/powered-by-asus/upload/scenario/20240813181719_pic2.jpg", count: 30 },
  { name: "Music", img: "https://i0.wp.com/www.songstuff.com/wp-content/uploads/2022/05/6EA7D984-EC3E-4449-9A24-D501E5B86287.webp", count: 17 },
  { name: "Art", img: "https://m.media-amazon.com/images/I/819RLSh1A+L._AC_UF894,1000_QL80_.jpg", count: 25 },
  { name: "Stationery", img: "https://etimg.etb2bimg.com/photo/84941023.cms", count: 38 },
  { name: "Pets", img: "https://www.all4pets.in/wp-content/uploads/2024/01/moist-food.jpg", count: 60 },
  { name: "Gardening", img: "https://cdn.mos.cms.futurecdn.net/UjET9SXZtkZyzJaYoUnsZM.jpg", count: 18 },
  { name: "Outdoor", img: "https://www.pariaoutdoorproducts.com/cdn/shop/files/Paria_Outdoor_Products_-_Home_Page_Hero_bb85800c-7451-4876-9531-e8b0f174443e_1400x.jpg?v=1618260813", count: 40 },
  { name: "Crafts", img: "https://technologystudent.com/prddes1/artcratf4.png", count: 12 },
  { name: "Baby", img: "https://atslab.com/wp-content/uploads/2024/07/CPSC_baby_product_testing.jpg", count: 20 },
  { name: "Travel", img: "https://cdn.packhacker.com/2020/06/6a9261ad-post-coronavirus-travel-accessories.jpg", count: 34 },
  { name: "Photography", img: "https://images.ctfassets.net/wowgx05xsdrr/2zBA71ChjhkM7BCNAk1Ga1/549d647a7f71d0dcb1475c41376c7b71/ecommerce-product-photography.jpg?fm=webp&w=3840&q=75", count: 24 },
  { name: "Education", img: "https://www.productplan.com/uploads/AdobeStock_571110526-scaled.jpeg", count: 45 },
  { name: "Office Supplies", img: "https://www.3m.com/wps/wcm/connect/48112995-f63f-4b8c-a5b8-afca60d8e4b3/rG-57-Columns_OFFICE-1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-48112995-f63f-4b8c-a5b8-afca60d8e4b3-ll8uu5x", count: 50 }
];


// Initialize DB and Server
const initializeDBAndServer = async () => {
  try {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      gender TEXT,
      location TEXT
    )`, (err) => {
      if (err) {
        console.log('Error creating table:', err);
      }
    });

    app.listen(3001, () => {
      console.log('Server Running at http://localhost:3001/');
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

// Create User API
app.post('/signup/', async (request, response) => {
  const { username, name, password, gender, location } = request.body;
  console.log(request.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectUserQuery = `SELECT * FROM users WHERE username = ?`;

    db.get(selectUserQuery, [username], (err, dbuser) => {
      if (err) {
        console.error("Database Error:", err);
        response.status(500).send('Internal Server Error');
      } else if (dbuser === undefined) {
        const createUserQuery = `
          INSERT INTO users (username, name, password, gender, location)
          VALUES (?, ?, ?, ?, ?);`;

        db.run(createUserQuery, [username, name, hashedPassword, gender, location], (err) => {
          if (err) {
            console.error('Error creating user:', err);
            response.status(500).send('Internal Server Error');
          } else {
            response.send('User Created Successfully');
          }
        });
      } else {
        response.status(400).send('Username Already Exists');
      }
    });

  } catch (e) {
    console.error('Error:', e);
    response.status(500).send('Server Error');
  }
});

// User Login API
app.post('/login/', async (request, response) => {
  const { username, password } = request.body;
  
  try {
    const selectUserQuery = `SELECT * FROM users WHERE username = ?`;
    db.get(selectUserQuery, [username], async (err, dbuser) => {
      if (err) {
        console.error("Database Error:", err);
        response.status(500).send('Internal Server Error');
      } else if (dbuser === undefined) {
        response.status(400).send('Invalid user');
      } else {
        const isPasswordMatched = await bcrypt.compare(password, dbuser.password);
        if (isPasswordMatched) {
            const payload = {
                username: username
            }
            const jwtToken = jwt.sign(payload, "MY_SECRECT_TOKEN")
          response.send({jwtToken});
        } else {
          response.status(400).send('Invalid Password');
        }
      }
    });
  } catch (e) {
    console.error('Error:', e);
    response.status(500).send('Server Error');
  }
});

// Categories API
app.get('/api/categories', (req, res) => {
  res.json({ categories });
});