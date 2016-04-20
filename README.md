# generator-antd
generator-antd是基于yeoman开发的后台代码生成器

## 有什么用？
- 快速搭建基于React + Redux + [Ant.design](https://github.com/ant-design/ant-design) + Webpack的后台管理系统开发环境

- 定义数据模型的蓝图（blueprint）模块后使用一条命令即可生成模型对应的表单组件、表格组件、视图组件以及负责模型CRUD异步数据操作的Redux Reducer模块

## 如何使用？
- 安装yeoman与generator-antd

  ```$ npm i yo generator-antd -g```
- 搭建后台项目框架

  ```$ yo antd:init```
- 生成蓝图模块

  ```$ yo antd:blueprint```
- 生成组件

  ```$ yo antd [BLUEPRINT_FILE_PATH]```
- 在src/routes/index.js中加入component为生成的View组件的路由

- 在src/redux/rootReducer.js中加入生成的reducer

- ```$ npm run dev```

## Doc & Api
生成器列表：

|指令|说明|
|----------------|----------------|
|yo antd [path]|根据path所在的蓝图模块生成对应的form模块或table模块或view模块或者所有三种模块|
|yo antd:init|生成项目基本框架|
|yo antd:blueprint|生成蓝图模块|
|yo antd:bp|同上|
|yo antd:form|生成表单组件|
|yo antd:table|生成表格组件|
|yo antd:crud|生成reducer模块|
|yo antd:view|生成整合表单、表格以及reducer的视图组件|
