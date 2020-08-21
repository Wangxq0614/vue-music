const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  // 预渲染插件自动生成代码
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // 预渲染内容写入之前的额外操作

        // 根据字符串创建一个网页
        const html = new JSDOM(route.html)
        // 从创建好的网页中拿到document对象
        const dom = html.window.document
        // 找到对应元素，删除对应元素
        const loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)

        route.html = html.serialize()
        return route
      }
    }
  }
}
