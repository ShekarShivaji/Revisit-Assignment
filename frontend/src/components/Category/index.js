import "./index.css"
import {Component} from "react"
import {Navigate , Link} from "react-router-dom"
import CategoryCard from "../CategoryCard/index"
import { IoSearch } from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { IoHomeOutline,IoPricetagOutline,IoPeopleOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { CiFileOn } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb"; 
import { FaRegStar } from "react-icons/fa";
import { MdMoveToInbox } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import Cookies from 'js-cookie'
 

class Category extends Component{
    state = {
        categoriesList: []
    }

    componentDidMount() {
        this.getCategoriesList()
    }
    
    onClickLogout = () => {
        Cookies.remove('jwt_token')
        window.location.replace('/login')
      }


    getCategoriesList = async () => {
        const response = await fetch("http://localhost:3001/api/categories")
        const data = await response.json()
        const categories = data.categories.map(item => ({
            name: item.name,
            count: item.count,
            img: item.img
        }))
        
        this.setState({categoriesList: categories})
    }

    render() {
        const {categoriesList} = this.state
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
            return <Navigate to="/login" />
        }
         
        return (
            <div className="category-bg">
                <div className="nav-Container">
                    <div className="textContainer"> 
                        <div style={{display: "flex",alignItems:"center"}}>
                            <img className="logoImage" alt="logo" src="https://res.cloudinary.com/dqkjtjb9x/image/upload/c_fill,w_85,h_300,g_auto/v1744545814/ChatGPT_Image_Apr_13_2025_05_33_21_PM_tfgfyy.png"/>
                            <h1 className="fastcarttext">fastcart</h1>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <IoSearch color="#fff" width="30" />
                            <input placeholder="Search" className="searchInput" type="search"  />
                        </div>
                    </div>
                    <div className="Container"> 
                        <BiMessageSquareDetail color="#fff" width="40" />
                        <MdOutlineNotificationsNone color="#fff" width="40" />
                        <div className="name-first-later">R</div>
                        <p style={{color: "#fff"}}>Randhir Kumar</p>
                        <FaChevronDown color="#fff" width="40"/>
                    </div>  
                </div>
                <div className="category-section">
                    <div className="side-bar-Container">  
                        <div style={{display: "flex",alignItems:"center"}}>
                            <IoHomeOutline color="#fff" width="40"  />  <p style={{color: "#fff" , marginLeft:"10px"}}>Dashboard</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <GoListUnordered  color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Orders</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                        <IoPricetagOutline  color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Products</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                        <CiFileOn color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Categories</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <IoPeopleOutline color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Customers</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <TbReportAnalytics color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Reports</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <FaRegStar color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Coupns</p>
                        </div>
                        <div style={{display: "flex",alignItems:"center"}}>
                            <MdMoveToInbox color="#fff" width="30" />  <p style={{color: "#fff" , marginLeft:"10px"}}>Inbox</p>
                        </div>
                        <Link onClick={this.onClickLogout}>
                            <button className="logOutBtn"> <IoMdLogOut /> Logout</button>
                        </Link>
                        
                        
                    </div>
                    <ul className="category-items-container">
                        {
                            categoriesList.map((item) => <CategoryCard item={item} key={item.name} />)
                        }
                    </ul>
                    
                </div>
            </div>
        )
    }
}

export default Category