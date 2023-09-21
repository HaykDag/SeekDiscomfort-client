import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../../features/users/usersSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { Link } from "react-router-dom";
import { selectAllItems } from "../../features/items/itemsSlice";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(selectUser);
    const items = useSelector(selectAllItems);

    const handlLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <header>
            <div className="navbar-cnt">
                <div className="brand-links-cnt">
                    <div className="brand-title">
                        <Link to="/">Seek unComfort</Link>
                    </div>
                    
                    <div className='navbar-links'>
                        <ul>
                            <li>
                                <Link to="/">HOME</Link>
                            </li>
                            {user.isAdmin && (
                                <>
                                    <li>
                                        <Link to="/admin">DASHBOARD</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/chat">CHAT</Link>
                                    </li>
                                </>
                            )}
                            {!user.username && (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                {user.username && (
                    <div className="cart-logout">
                        <ShoppingCart user={user} items={items} />
                        <Tooltip placement="bottom" title="Logout">
                        <div className="logout" onClick={handlLogout}>
                            <span>{user.username}</span>
                            <LogoutOutlined />
                        </div>
                        </Tooltip>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
