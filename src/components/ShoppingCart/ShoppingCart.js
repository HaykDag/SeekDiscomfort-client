import {
    MinusCircleOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import { removeItemFromBasket } from "../../features/users/usersSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./shoppingCart.css";
import { Link } from "react-router-dom";
import { AppUrl } from "../AppData";
const ShoppingCart = ({ user }) => {

    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (e.message.includes("ResizeObserver")) {
                const resizeObserverErrDiv = document.getElementById(
                    "webpack-dev-server-client-overlay-div"
                );
                const resizeObserverErr = document.getElementById(
                    "webpack-dev-server-client-overlay"
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute("style", "display: none");
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute("style", "display: none");
                }
            }
        });
    }, []);

    const dispatch = useDispatch();

    const handleOrder = (id) => {
        //write the logic for ordering items
        console.log("order", id);
    };
    const handleRemove = async (id) => {
        const res = await axios.delete(`/basket/${id}`);
        console.log(res.data);
        dispatch(removeItemFromBasket(id));
    };

    const basketItems = user.basket?.map((item) => {
        return {
            key: item.id,
            label: (
                <div className="cart-list">
                    <Link to={AppUrl.Items + item.id} className="cart-item-info-cnt">
                        <span>
                            {item?.title.substring(0,10)}{item?.title?.length>10 ? "..." : "" } 
                        </span>
                        |
                        <span>
                        {item?.price.substring(0,item?.price.length-3)}&#1423;
                        </span>
                    </Link>
                    <div className="cart-list-btn-cnt">
                        <PlusOutlined
                            style={{ backgroundColor: "lightgreen", padding:"4px", borderRadius:"50%" }}
                            onClick={() => handleOrder(item.id)}
                        />
                        <MinusCircleOutlined
                            style={{ backgroundColor: "red" ,padding:"4px", borderRadius:"50%"}}
                            onClick={() => handleRemove(item.id)}
                        />
                    </div>
                </div>
            ),
        };
    });

    return (
        <div className="cart">
            <Dropdown menu={{ items: basketItems }} placement="bottom">
                <Badge count={user.basket.length} size="small">
                    <ShoppingCartOutlined className="cart-icon" />
                </Badge>
            </Dropdown>
        </div>
    );
};

export default ShoppingCart;
