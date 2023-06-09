Page({
  data: {
    title: '南方科技大学入校参观系统上线啦！',
    publisher_pic: '../../images/icons/sustech.png',
    publisher_name: '南方科技大学',
    content_img: '',
    content: "南方科技大学入校参观系统上线啦！近日，南方科技大学宣布其新的入校参观系统正式上线。该系统为学校师生、家长和来访者提供了更加便捷和高效的参观体验。\n\n据悉，该系统由南方科技大学的信息技术中心开发，可以通过网页端和移动端进行访问。在系统中，参观者可以轻松了解南方科技大学的历史、文化、特色和发展情况，并在线上预约校园参观和接待服务。此外，该系统还支持语音导览、虚拟实景漫游和多语言翻译等功能，为不同需求的参观者提供了更加全面和贴心的服务。 据南方科技大学有关负责人介绍，新的入校参观系统的推出将进一步提升学校形象和知名度，促进校内外文化交流和合作。\n\n同时，该系统也将为学生和教职员工提供更好的服务和管理，加强学校与社会的联系和互动。南方科技大学作为中国高水平研究型大学，一直致力于推进科学技术创新和人才培养。相信该校新的入校参观系统的上线，将进一步提升学校的教育教学质量和社会影响力，为构建创新型国家和实现中华民族伟大复兴作出更大的贡献。"
  },

  onLoad: function (params) {
    let news = JSON.parse(params.news);
    this.setData({'title': news.news_title, 'publisher_pic': news.news_source_img,
  'publisher_name': news.news_source_name, 'content': news.content, 'content_img': news.news_cover})
  }
})
