# Getting Started with Create React App

## 安裝了的東西
node v16.20.0
其他可看 ./package.json

## 名詞
- component：我們規劃可以給使用者新增的東西
- container：
    - control panel：最左，可以調整 component 的屬性
    - workspace：中間，使用者目前的佈局會顯示在這
    - viewer：最右，顯示生好的 html
- outerStyle：component 有關位置的屬性

## 規劃
- 使用 node 來將要的畫面寫入 html 檔 api 還沒規劃、目前只架在本機上
- 使用 grid 來排東西
- 在 control panel 設定屬性（用拖拉的方式可能有點難，mvp 先這樣做？）
- 使用 src/context//Context.js 來傳東西，將需要傳給後端的東西（component 的屬性）、其他可能會在多個 container 用到的東西設定在 app.js

## 下一步
- 增加選取功能、並可以調整選到的 component
- 規劃 api 要傳什麼
- 將 control panel 做得更完善

