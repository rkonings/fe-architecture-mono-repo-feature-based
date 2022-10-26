import { Cart, getCart } from "@rkonings/cart";
import { InferGetServerSidePropsType } from "next";
import {
  CartActions,
  selectCart,
  fetchCart,
} from "../../src/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../src/hooks";
import { wrapper } from "../../src/store";

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(selectCart);
  console.log(cartState);

  function onClickHandler() {
    // dispatch(CartActions.increment());
  }
  return (
    <div>
      <h1>Cart Redux: {cartState.uid}</h1>
      <button onClick={onClickHandler}>Increment</button>
      <button onClick={() => dispatch(fetchCart())}>FetchCart</button>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {

      const cart = await getCart();
      store.dispatch(CartActions.setCart(cart));

      return {
        props: {},
      };
    }
);
