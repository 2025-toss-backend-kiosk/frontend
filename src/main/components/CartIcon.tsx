import React from "react";
import { useNavigate } from "react-router-dom";
import cartImg from "../images/cart.png";
import { useCart } from "../../store/CartContext";

const CartIcon: React.FC<{ to?: string }> = ({ to = "/cart" }) => {
  const nav       = useNavigate();
  const { items } = useCart();
  const hasItem   = items.length > 0;

  return (
    <div
      onClick={() => nav(to)}
      style={{
        position: "absolute",
        top: "50px",
        right: "225px",
        marginRight: "25px",
        width: "30px",
        height: "25px",
        cursor: "pointer",
      }}
    >
      <img
        src={cartImg}
        alt="장바구니"
        style={{
          width: "100%",
          height: "100%",
          filter: hasItem ? "none" : "grayscale(100%) opacity(.5)",
          transition: "filter .3s",
        }}
      />
      {hasItem && (
        <span
          style={{
            position: "absolute",
            top: "-3px",
            right: "-3px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "red",
            boxShadow: "0 0 4px rgba(0,0,0,.4)",
          }}
        />
      )}
    </div>
  );
};

export default CartIcon;