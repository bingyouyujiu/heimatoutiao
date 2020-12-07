module.exports = {
    plugins: {
      'autoprefixer': {
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
      },
      'postcss-pxtorem': {
        rootValue:function({file}){
           return file.indexOf('vant')>-1 ? 37.5 : 70
        },
        propList: ['*'],
        exclude:'github-markdown.css'
      }
    }
  }