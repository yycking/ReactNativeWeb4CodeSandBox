// store: 一個app state的集合體，以object表示
// 換句話說，store是由許多state組成
// 先規劃 store,初始值如下
// {
//   原料: ["咖啡"],
//   顏色: {
//    紅: 111,
//    綠: 78,
//    藍: 55,
//  }
// }

// action:一個描述行為的的object
// 用來告知 reducer 更新 state 的動作
// ！！！ action必須含有 type 這個預設的鍵值
const 加牛奶 = () => ({
  type: "添加",
  料: "牛奶"
});

// reducer: 接收舊 state 與 action的指示，產生一個新的 state 回 store
// state的預設值，即store的預設值
const 顏色 = (state = { 紅: 111, 綠: 78, 藍: 55 }, action) => {
  switch (action.料) {
    case "牛奶":
      return { 紅: state.紅 + 10, 綠: state.綠 + 10, 藍: state.藍 + 10 };
    default:
      return state;
  }
};

const 原料 = (state = ["咖啡"], action) => {
  switch (action.type) {
    case "添加":
      return [...state, action.料];
    default:
      return state;
  }
};

// 將多個 reducers 合併為一個 reducer
import { combineReducers } from "redux";
const reducer = combineReducers({
  原料,
  顏色
});

// 依照reducer建立store
import { createStore } from "redux";
const store = createStore(reducer);
console.log(JSON.stringify(store.getState()));

// Compoment: 依照 props 建立
import React from "react";
import { Text, View, Button } from "react-native";
const 飲品 = props => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: props.color
    }}
  >
    <Text>{props.description}</Text>
    <Button title="+牛奶" onPress={props.加牛奶} />
  </View>
);

// container: 負責代表 Compoment 與 redux 交流，將store／action 轉成props
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const 特調 = connect(
  state => ({
    color: `rgb(${state.顏色.紅}, ${state.顏色.綠}, ${state.顏色.藍})`,
    description: state.原料.toString()
  }),
  dispatch => bindActionCreators({ 加牛奶 }, dispatch)
)(飲品);

// Provider: 是使用在應用程式的根元件內，負責將唯一的 store 傳下去給其他子元件
import { Provider } from "react-redux";
export default () => (
  <Provider store={store}>
    <特調 />
  </Provider>
);
