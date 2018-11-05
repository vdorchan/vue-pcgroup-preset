# vue-pcgroup-preset

vue-pcgroup-preset 是按照 [VUE CLI 3](https://cli.vuejs.org/zh/) 规范，以及太平洋专题的一些特点，编写的一个预设模版，配合[VUE CLI 3](https://cli.vuejs.org/zh/) 可快速开发专题。

## 快速开始

### 安装 vue-cli3

```bash
npm install -g @vue/cli
```

### 安装本远程preset

```bash
vue create --preset vdorchan/vue-pcgroup-preset my-project
```

### 编译并进行开发，带有热加载的功能

```bash
npm run serve
```

### 上线前，编译并生成压缩文件

```bash
npm run build
```

## 配置文件

第一次创建任务的时候，会询问你的账号、密码、工作地点等用户信息，该信息将用于上传等任务，这些信息将存储在用户目录下的一个配置文件中（ ```.pcuserconf```），避免重复询问。你可直接修改这个配置文件来修改你的用户信息。

配置文件示例

```json
{
  "username": "zhangshuaige",
  "password": "0123456",
  "city": "gz"
}
```