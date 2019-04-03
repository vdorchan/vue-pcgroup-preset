# vue-pcgroup-preset

vue-pcgroup-preset 是按照 [VUE CLI 3](https://cli.vuejs.org/zh/) 规范，以及专题的一些特点，编写的一个预设模版，配合[VUE CLI 3](https://cli.vuejs.org/zh/) 可快速开发专题。

## 快速开始

### 安装 vue-cli3

```bash
npm install -g @vue/cli
```

### 安装本远程preset

```bash
# 默认将进行 git 初始化，不需要的话可加上 no-git 选项
vue create --preset vdorchan/vue-pcgroup-preset my-project --no-git
```

### 编译并进行开发，带有热加载的功能

```bash
npm run serve
```

### 上线前，编译并生成压缩文件

```bash
npm run build
```

### 打包并上传

```bash
npm run www1
```

## 配置文件

第一次创建任务的时候，会询问你的账号、工作地点等用户信息，该信息将用于快捷填充 html 页面的作者信息，这些信息将存储在用户目录下的一个配置文件中（ ```.pcuserconf```），避免重复询问。你可直接修改这个配置文件来修改你的用户信息。

如果你使用 pcfe-cli 工具的话，那么这一步就不会出现了，他们共享一份用配置文件。

配置文件示例

```json
{
  "username": "zhangshuaige",
  "city": "gz"
}
```

## 功能列表

- [x] 专题模版
- [x] rem 单位自动转换
- [x] axios
- [x] vue-awesome-swiper
- [x] postcss/less/sass
- [x] ES6/Typescript
- [x] ESLint/Babel
- [x] vue-router
- [x] vuex
- [x] PWA