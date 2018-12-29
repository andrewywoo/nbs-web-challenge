(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(t,e,a){t.exports=a(88)},38:function(t,e,a){},40:function(t,e,a){},69:function(t,e,a){},71:function(t,e,a){},86:function(t,e,a){},88:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(31),s=a.n(i),c=(a(38),a(11)),l=a(12),o=a(14),u=a(13),h=a(15),d=(a(40),a(3)),m=a.n(d),f=a(32),D=a.n(f),g=a(2),v=(a(69),700),b=400,p={top:20,right:5,bottom:20,left:50},y=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(o.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={bars:[],xScale:g.f().range([p.left,v-p.right]),yScale:g.e().range([b-p.bottom,p.top])},a.xAxis=g.a().scale(a.state.xScale).tickFormat(g.h("%b-%Y")),a.yAxis=g.b().scale(a.state.yScale).tickFormat(function(t){return t}),a}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){g.g(this.refs.xAxis).call(this.xAxis),g.g(this.refs.yAxis).call(this.yAxis)}},{key:"render",value:function(){var t=this;return r.a.createElement("svg",{width:v,height:b},this.state.bars.map(function(e,a){return r.a.createElement("rect",{key:a,x:e.x,y:e.y,height:e.height,width:v/t.state.bars.length})}),r.a.createElement("g",null,r.a.createElement("g",{ref:"xAxis",transform:"translate(0, ".concat(b-p.bottom,")")}),r.a.createElement("g",{ref:"yAxis",transform:"translate(".concat(p.left,", 0)")})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(!t.data)return null;var a=t.data,n=e.xScale,r=e.yScale;return n.domain(g.c(a,function(t){return t.date})),r.domain([0,g.d(a,function(t){return t.value})]),{bars:a.map(function(t){return{x:n(t.date),y:r(t.value),height:b-r(t.value)-p.bottom}})}}}]),e}(n.Component),E=(a(71),function(t){var e;return t.metricNames&&(e=t.metricNames.map(function(e){return r.a.createElement("button",{key:e.id,onClick:t.clicked.bind(void 0,e.id)},e.fullName)})),r.a.createElement("div",{className:"metric-view-bar"},e)}),S=a(19),A=a.n(S),Y=(a(83),a(8)),x=(a(86),function(t){return r.a.createElement("div",{className:"SearchOptions"},r.a.createElement("div",null,r.a.createElement("label",{for:"search"},"Artist:"),r.a.createElement("input",{id:"search",className:"artistSearchInput",type:"text",placeholder:"Search An Artist",onChange:t.handleArtistChange})),r.a.createElement("div",null,r.a.createElement("label",{for:"startDt"},"Start Date:"),r.a.createElement(A.a,{id:"startDt",onDayChange:t.handleStartDateChange,formatDate:Y.formatDate,format:"YYYY-MM-DD",parseDate:Y.parseDate,value:t.startDate})),r.a.createElement("div",null,r.a.createElement("label",{for:"endDt"},"End Date:"),r.a.createElement(A.a,{id:"endDt",onDayChange:t.handleEndDateChange,formatDate:Y.formatDate,format:"YYYY-MM-DD",parseDate:Y.parseDate,value:t.endDate})))}),C=a(6),k=a.n(C),I=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(o.a)(this,Object(u.a)(e).call(this))).state={artist:"",artistInfo:null,metrics:null,info:null,metricId:41,startDate:k()("2017-01-01").format("YYYY-MM-DD"),endDate:k()("2017-12-31").format("YYYY-MM-DD")},t.handleArtistChange=function(e){t.emitDebouncedSearch(e.target.value)},t.handleArtistSearch=function(e){t.setState({artist:e})},t.handleStartDateChange=function(e){t.setState({startDate:k()(e).format("YYYY-MM-DD")})},t.handleEndDateChange=function(e){t.setState({endDate:k()(e).format("YYYY-MM-DD")})},t.getChartData=function(e){var a=t.state.metrics.data.filter(function(t){return t.metricId===e});if(a.length){var n=a[0].timeseries.deltas;return Object.keys(n).map(function(t){return{date:new Date(t),value:n[t]}})}},t.handleMetricIdChange=function(e){t.setState({metricId:e})},t.emitDebouncedSearch=D()(t.handleArtistSearch,500),t}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.grabMetricInfo(),this.state.artist&&this.grabArtistData()}},{key:"componentDidUpdate",value:function(t,e){this.state.artist&&(this.state.artist!==e.artist&&this.grabArtistData(),this.state.startDate&&this.state.endDate&&(this.state.startDate===e.startDate&&this.state.endDate===e.endDate||this.grabArtistData()))}},{key:"grabMetricInfo",value:function(){var t=this;m.a.get("metrics/?fields=items.*").then(function(e){t.setState({info:e.data})}).catch(function(t){return console.log(t)})}},{key:"grabArtistData",value:function(){var t=this;m.a.get("search/v1/artists/?query=".concat(this.state.artist,"&limit=1")).then(function(e){if(!e.data.artists.length)return null;var a=e.data.artists[0];return m.a.get("artists/".concat(a.id,"/data?metricIds=28,41,11,151,247&startDate=").concat(t.state.startDate,"&endDate=").concat(t.state.endDate,"&timeseries=totals,deltas"))}).then(function(e){if(e)return t.setState({metrics:e.data,metricId:e.data.data[0].metricId}),console.log("metrics",e.data),m.a.get(e.data.artist.self.url)}).then(function(e){e&&(console.log("artistinfo",e.data),t.setState({artistInfo:e.data}))}).catch(function(t){return console.log(t)})}},{key:"render",value:function(){var t,e,a,n,i,s=this;return this.state.artistInfo&&(t=r.a.createElement("img",{height:"100",src:this.state.artistInfo.images[0][100],alt:"Artist"}),e=r.a.createElement("h1",null,"Artist Name: ",this.state.artistInfo.name),a=r.a.createElement("h2",null,"Genre: ",this.state.artistInfo.genres.join(" "))),this.state.metrics&&(n=r.a.createElement(y,{data:this.getChartData(this.state.metricId)}),i=this.state.metrics.data.reduce(function(t,e){var a=!0,n=!1,r=void 0;try{for(var i,c=s.state.info.items[Symbol.iterator]();!(a=(i=c.next()).done);a=!0){var l=i.value;if(l.id===e.metricId){t.push({fullName:l.fullName,id:l.id});break}}}catch(o){n=!0,r=o}finally{try{a||null==c.return||c.return()}finally{if(n)throw r}}return t},[]).sort(function(t,e){return t.id-e.id})),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement(x,{handleArtistChange:this.handleArtistChange,handleStartDateChange:this.handleStartDateChange,handleEndDateChange:this.handleEndDateChange,startDate:this.state.startDate,endDate:this.state.endDate}),r.a.createElement("div",{className:"artist-info"},t,r.a.createElement("div",{style:{textAlign:"center"}},e,a)),n,r.a.createElement(E,{clicked:this.handleMetricIdChange,metricNames:i})))}}]),e}(n.Component);m.a.defaults.baseURL="https://api.nextbigsound.com/",m.a.defaults.params={},m.a.defaults.params.access_token="eb74a82009cbc53c9b44866743633f9d",s.a.render(r.a.createElement(I,null),document.getElementById("root"))}},[[33,2,1]]]);
//# sourceMappingURL=main.8c8bb357.chunk.js.map