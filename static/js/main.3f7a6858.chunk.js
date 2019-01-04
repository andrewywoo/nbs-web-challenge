(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(t,e,a){},128:function(t,e,a){},130:function(t,e,a){},133:function(t,e,a){},135:function(t,e,a){},137:function(t,e,a){},196:function(t,e,a){},198:function(t,e,a){},200:function(t,e,a){},202:function(t,e,a){},204:function(t,e,a){},206:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),i=a(7),c=a.n(i),s=(a(95),a(89)),l=a(20),o=a(21),u=a(23),d=a(22),m=a(24),h=(a(97),a(14)),f=a.n(h),g=a(83),v=a.n(g),k=(a(126),function(t){return r.a.createElement("nav",{className:"NavigationBar"},r.a.createElement("div",{className:"NavigationBar__search-bar"},r.a.createElement("input",{id:"search",className:"NavigationBar__input",type:"text",placeholder:"Search For An Artist",onChange:t.handleArtistChange})),r.a.createElement("div",{className:"NavigationBar__links"},r.a.createElement("ul",{className:"NavigationBar__ul"},r.a.createElement("li",{className:"NavigationBar__li"},r.a.createElement("a",{href:"#artistInfo",className:"NavigationBar__href"},"Artist Info")),r.a.createElement("li",{className:"NavigationBar__li"},r.a.createElement("a",{href:"#socialMedia",className:"NavigationBar__href"},"Social Media")),r.a.createElement("li",{className:"NavigationBar__li"},r.a.createElement("a",{href:"#trackSpins",className:"NavigationBar__href"},"Track Spins")),r.a.createElement("li",{className:"NavigationBar__li"},r.a.createElement("a",{href:"https://github.com/andrewywoo/",className:"NavigationBar__href"},"by awoo")))))}),p=(a(128),function(t){return r.a.createElement("div",{style:t.style,className:"Loader"},"Loading...")}),y=a(4),M=(a(130),function(t){var e=null,a=null,n=null,i=null,c=null,s=null,l=null,o=y.h(",");return t.isLoaded&&(i=r.a.createElement(p,null)),t.artistInfo&&(e=r.a.createElement("img",{src:t.artistInfo.images[0].original,alt:"Artist"}),a=r.a.createElement("h1",null,t.artistInfo.name),n=r.a.createElement("h2",null,t.artistInfo.genres.join(" - ")),c=r.a.createElement("p",null,t.artistInfo.recordLabels.join(" - ")),t.artistInfo.pandoraAudience.monthlyActiveListeners&&(s=r.a.createElement("p",null,o(t.artistInfo.pandoraAudience.monthlyActiveListeners.total))),t.artistInfo.pandoraAudience.streams&&(l=r.a.createElement("p",null,o(t.artistInfo.pandoraAudience.streams.total))),i=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"ArtistInfo__info-bio"},r.a.createElement("div",{className:"ArtistInfo__info-image"},e),r.a.createElement("div",{className:"ArtistInfo__info-description"},a,n,c)),r.a.createElement("div",null,r.a.createElement("section",{className:"ArtistInfo__info-card"},r.a.createElement("h2",null,"Monthly Active Listeners"),r.a.createElement("div",null,s)),r.a.createElement("section",{className:"ArtistInfo__info-card"},r.a.createElement("h2",null,"Monthly Total Streams"),r.a.createElement("div",null,l))))),r.a.createElement("div",{id:"artistInfo",className:"ArtistInfo"},r.a.createElement("div",{className:"ArtistInfo__label"},r.a.createElement("span",null,"Artist Info")),r.a.createElement("div",{className:"ArtistInfo__info"},i))}),b=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(r)))).state={x:null,y:null,width:null,height:null,fill:null},a}return Object(m.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.animateRect()}},{key:"componentDidUpdate",value:function(){this.animateRect()}},{key:"shouldComponentUpdate",value:function(t,e){return t.x!==this.state.x||t.y!==this.state.y||t.width!==this.state.width||t.height!==this.state.height||t.fill!==this.state.fill}},{key:"animateRect",value:function(){var t=this.state,e=t.y,a=t.height;(this.props.yExtent?y.q(this.refs.rect).attr("y",this.props.yScale(this.props.yExtent[0])):y.q(this.refs.rect).attr("y",this.props.yScale(0))).attr("height",0).transition().duration(800).attr("y",e).attr("height",a)}},{key:"render",value:function(){var t=this.state,e=t.x,a=t.y,n=t.height,i=t.width,c=t.fill;return r.a.createElement("rect",{onMouseOver:this.props.onMouseOverCallback,onMouseOut:this.props.onMouseOutCallback,ref:"rect",x:e,y:a,height:n,width:i,fill:c})}}],[{key:"getDerivedStateFromProps",value:function(t,e){return t?{x:t.x,y:t.y,width:t.width,height:t.height,fill:t.fill}:null}}]),e}(n.Component),E=a(9),I=a.n(E),D=(a(133),a(135),function(t){var e=t.xScale,a=t.yScale,n={left:t.hoveredBar.x,top:t.hoveredBar.y};return r.a.createElement("div",{className:"Tooltip",style:n},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{colSpan:"2"}))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"1"},"Date:"),r.a.createElement("td",{colSpan:"1"},I()(e.invert(t.hoveredBar.x)).format("MMM Do YYYY"))),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"1"},"Value:"),r.a.createElement("td",{colSpan:"1"},y.h(",.0f")(a.invert(t.hoveredBar.y)))))))}),x=100,S=20,N=20,_=50,C=480-S-_,A=800-x-N,T=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(r)))).state={bars:[],xScale:y.o().range([0,A]),yScale:y.l().range([C,0]),wScale:y.k().range([0,A]).paddingInner(.1).paddingOuter(0),accentScale:y.n(y.i),yExtent:null,metricId:null,startDate:null,endDate:null,artistId:null,hoveredBar:null},a.xAxis=y.a(a.state.xScale).tickFormat(y.r("%b-%Y")),a.yAxis=y.b(a.state.yScale),a.onMouseOverCallback=function(t){a.setState({hoveredBar:t})},a.onMouseOutCallback=function(t){a.setState({hoveredBar:null})},a}return Object(m.a)(e,t),Object(o.a)(e,[{key:"shouldComponentUpdate",value:function(t,e){return t.metricId!==this.state.metricId||t.startDate!==this.state.startDate||t.endDate!==this.state.endDate||t.artistId!==this.state.artistId||e.hoveredBar!==this.state.hoveredBar}},{key:"componentDidMount",value:function(){this.drawAxis()}},{key:"componentDidUpdate",value:function(t,e){this.drawAxis()}},{key:"drawAxis",value:function(){y.q(this.refs.xAxis).transition().duration(800).call(this.xAxis).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),y.q(this.refs.yAxis).transition().duration(800).call(this.yAxis)}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"BarChart"},r.a.createElement("svg",{height:C+S+_,width:A+x+N},r.a.createElement("g",{transform:"translate(".concat(x,",").concat(S,")")},this.state.bars.map(function(e,a){return r.a.createElement(b,{key:a,x:e.x,y:e.y,height:e.height,width:t.state.wScale.bandwidth(),fill:e.fill,yScale:t.state.yScale,onMouseOverCallback:t.onMouseOverCallback.bind(t,e),onMouseOutCallback:t.onMouseOutCallback.bind(t,null)})}),r.a.createElement("g",{ref:"xAxis",transform:"translate(0, ".concat(C,")")}),r.a.createElement("g",{ref:"yAxis"}),r.a.createElement("text",{className:"BarChart-yLabel",x:-C/2,y:-80,transform:"rotate(-90)",textAnchor:"middle"},this.props.yLabel))),this.state.hoveredBar?r.a.createElement(D,{hoveredBar:this.state.hoveredBar,xScale:this.state.xScale,yScale:this.state.yScale}):null)}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(!t)return null;var a=t.chartData,n=t.startDate,r=t.endDate,i=t.metricId,c=t.artistId,s=e.xScale,l=e.yScale,o=e.wScale,u=e.accentScale,d=a.filter(function(t){var e=I.a.unix(n),a=I.a.unix(r),i=I()(t.date);return t.value&&t.date&&i>=e&&i<=a}).map(function(t){return t.value=+t.value,t});return s.domain(y.c(d,function(t){return t.date})),l.domain([0,y.j(d,function(t){return t.value})]),o.domain(d.map(function(t){return t.date})),u.domain([y.j(d,function(t){return t.value}),0]),{bars:d.map(function(t){return{x:s(t.date),y:l(t.value),height:C-l(t.value),fill:u(t.value)}}),yScale:l,metricId:i,startDate:n,endDate:r,artistId:c}}}]),e}(n.Component),w=(a(137),function(t){var e;return t.metricNames&&(e=t.metricNames.map(function(e){return e.id===t.metricId?r.a.createElement("button",{key:e.id,className:"MetricView__buttons selected-button",onClick:t.clicked.bind(void 0,e.id)},e.fullName):r.a.createElement("button",{key:e.id,className:"MetricView__buttons",onClick:t.clicked.bind(void 0,e.id)},e.fullName)})),r.a.createElement("div",{className:"MetricViews"},e)}),R=a(84),O=a(85),B=a(61),L=(a(194),a(196),(0,B.a.createSliderWithTooltip)(B.a.Range)),Y=I()(new Date).subtract(5,"y").unix(),j=I()(new Date).unix(),F=function(t){var e=null,a=null,n=null,i=null,c=null;if(t.isLoaded&&(n=r.a.createElement(p,null)),t.metrics){e=t.getChartData(t.metricId),a=t.metrics.data.reduce(function(e,a){var n=t.metricMetadata[a.metricId];return n&&e.push({fullName:n.fullName,id:a.metricId}),e},[]).sort(function(t,e){return t.id-e.id});var s=(i=t.metricMetadata[t.metricId].fullName).split(" ");c=s[s.length-1],console.log(e);var l=I()(e[0].date).unix();n=r.a.createElement(r.a.Fragment,null,r.a.createElement(w,{clicked:t.handleMetricIdChange,metricNames:a,chartTitle:i,metricId:t.metricId}),r.a.createElement("h1",{style:{marginBottom:".3em"}},i),r.a.createElement(T,{chartData:e,yLabel:c,metricId:t.metricId,startDate:t.startDate,endDate:t.endDate,artistId:t.artistId}),r.a.createElement("span",{className:"SocialMediaMetrics__metrics-date-range"},l>t.startDate?I.a.unix(l).format("MMM Do YYYY"):I.a.unix(t.startDate).format("MMM Do YYYY"),"   -   ",I.a.unix(t.endDate).format("MMM Do YYYY"),r.a.createElement(R.a,{style:{fontSize:"1.2rem",margin:"0 8px"},title:"Use the range slider below to edit the date range.",icon:O.a})),r.a.createElement(L,{className:"SocialMediaMetrics__metrics-range-slider",defaultValue:[l,t.endDate],min:Y,max:j,step:86400,allowCross:!1,tipFormatter:function(t){return I.a.unix(t).format("MMM Do YYYY")},onAfterChange:t.onRangeChange}))}return r.a.createElement("div",{id:"socialMedia",className:"SocialMediaMetrics"},r.a.createElement("div",{className:"SocialMediaMetrics__label"},r.a.createElement("span",null,"Social Media")),r.a.createElement("div",{className:"SocialMediaMetrics__metrics"},n))},q=(a(198),600-20-20),U=800-20-20,P=y.g().force("center",y.d(U/2,q/2)).force("charge",y.f().strength(200)),W=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(r)))).state={circles:[],rScale:y.l().range([30,125]),cScale:y.m(y.p),trackDateRange:null,trackMetricId:null,artistId:null},a.forceTick=function(){a.node.attr("transform",function(t){return"translate(".concat(t.x,", ").concat(t.y,")")})},a}return Object(m.a)(e,t),Object(o.a)(e,[{key:"shouldComponentUpdate",value:function(t,e){return t.trackDateRange!==this.state.trackDateRange||t.trackMetricId!==this.state.trackMetricId||t.artistId!==this.state.artistId}},{key:"componentDidMount",value:function(){var t=this;P.force("collision",y.e().radius(function(e){return t.state.rScale(e.value)})).on("tick",this.forceTick),this.renderCircles(),P.nodes(this.state.circles).alpha(.9).restart()}},{key:"componentDidUpdate",value:function(){var t=this;P.force("collision",y.e().radius(function(e){return t.state.rScale(e.value)})).on("tick",this.forceTick),this.renderCircles(),P.nodes(this.state.circles).alpha(.9).restart()}},{key:"renderCircles",value:function(){var t=this,e=y.q(this.refs.container).append("div").style("position","absolute").style("text-align","center").style("z-index","100").style("visibility","hidden").style("border","1px solid #fffff4").style("background","#fffff4").style("border-radius","4px").style("padding","8px").style("font-size","1.5rem"),a=y.h(",");this.node=y.q(this.refs.svgContainer).selectAll("g").data(this.state.circles),this.node.exit().remove(),this.nodeEnter=this.node.enter().append("g"),this.circles=this.nodeEnter.append("circle"),this.label=this.nodeEnter.append("text").attr("id","label"),this.val=this.nodeEnter.append("text").attr("id","val"),this.node=this.nodeEnter.merge(this.node),this.node.select("circle").attr("y",1).attr("r",function(e){return t.state.rScale(e.value)}).attr("fill",function(e){return t.state.cScale(e.name)}).on("mouseover",function(t){return e.html("<p>".concat(t.name,"</p><p>").concat(a(t.value),"</p>")).style("visibility","visible")}).on("mousemove",function(t){return e.style("top","".concat(t.y,"px")).style("left","".concat(t.x,"px"))}).on("mouseout",function(){return e.style("visibility","hidden")}),this.node=this.nodeEnter.merge(this.node),this.node.select("#label").attr("text-anchor","middle").attr("font-size",function(e){return t.state.rScale(e.value)/4}).attr("fill","black").attr("font-family","'Pragati Narrow', sans-serif").text(function(e){return e.name.length>17&&t.state.rScale(e.value)/3>17?e.name.substring(0,17):e.name.substring(0,t.state.rScale(e.value)/3)}).on("mouseover",function(t){return e.html("<p>".concat(t.name,"</p><p>").concat(a(t.value),"</p>")).style("visibility","visible")}).on("mousemove",function(t){return e.style("top","".concat(t.y,"px")).style("left","".concat(t.x,"px"))}).on("mouseout",function(){return e.style("visibility","hidden")}),this.node=this.nodeEnter.merge(this.node),this.node.select("#val").attr("text-anchor","middle").attr("font-size",function(e){return t.state.rScale(e.value)/4}).attr("dy","1em").attr("fill","black").attr("font-family","'Pragati Narrow', sans-serif").text(function(t){return a(t.value)}).on("mouseover",function(t){return e.html("<p>".concat(t.name,"</p><p>").concat(a(t.value),"</p>")).style("visibility","visible")}).on("mousemove",function(t){return e.style("top","".concat(t.y,"px")).style("left","".concat(t.x,"px"))}).on("mouseout",function(){return e.style("visibility","hidden")})}},{key:"render",value:function(){return r.a.createElement("div",{className:"BubbleContainer",ref:"container"},r.a.createElement("svg",{ref:"svgContainer",width:U,height:q}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(!t)return null;var a=t.data,n=t.trackDateRange,r=t.trackMetricId,i=t.artistId,c=e.rScale,s=e.cScale,l=a.sort(function(t,e){return e.summary[n]-t.summary[n]}).slice(0,15);return c.domain(y.c(l,function(t){return t.summary[n]})),s.domain(l,function(t){return t.metadata.asset_name}),{circles:l.map(function(t){return{name:t.metadata.asset_name,value:t.summary[n]}}),trackDateRange:n,trackMetricId:r,artistId:i}}}]),e}(n.Component),V=(a(200),a(202),function(t){var e,a={transform:"scale(.5)",margin:"0px 65px",padding:"0"};return e=[410,411,413,414].map(function(e){return t.trackMetrics[e]?e===t.trackMetricId?r.a.createElement("button",{className:"selected-button",onClick:t.handleTrackIdChange.bind(void 0,e)},t.metricMetadata[e].fullName):r.a.createElement("button",{onClick:t.handleTrackIdChange.bind(void 0,e)},t.metricMetadata[e].fullName):r.a.createElement(p,{style:a})}),r.a.createElement("div",{className:"TrackViews"},e)}),z=function(t){return Object.keys(t.dateRangeDict).map(function(e){return"LTD"===e&&413===t.trackMetricId?null:"LTD"===e&&414===t.trackMetricId?null:e===t.trackDateRange?r.a.createElement("button",{className:"selected-button",style:{margin:"12px 0"},key:e,onClick:t.handleTrackDateRangeChange.bind(void 0,e)},t.dateRangeDict[e]):r.a.createElement("button",{style:{margin:"12px 0"},key:e,onClick:t.handleTrackDateRangeChange.bind(void 0,e)},t.dateRangeDict[e])})},J=function(t){var e,a=null,n=null,i=null,c={TW:"This Week",LW:"Last Week",LM:"Last Month",YTD:"Year To Date",LTD:"Lifetime Value"};return t.isLoaded&&(n=r.a.createElement(p,null)),t.trackMetrics[t.trackMetricId]&&(a=t.getTrackData(t.trackMetricId),i=t.metricMetadata[t.trackMetricId].fullName,e=c[t.trackDateRange],n=r.a.createElement(r.a.Fragment,null,r.a.createElement(V,{trackMetrics:t.trackMetrics,trackMetricId:t.trackMetricId,handleTrackIdChange:t.handleTrackIdChange,metricMetadata:t.metricMetadata}),r.a.createElement("h1",{className:"TrackMetrics__metrics-title"},i),r.a.createElement("h2",{className:"TrackMetrics__metrics-range"},e),r.a.createElement("div",{className:"TrackMetrics__section"},r.a.createElement("div",{className:"TrackMetrics__section-range"},r.a.createElement(z,{handleTrackDateRangeChange:t.handleTrackDateRangeChange,dateRangeDict:c,trackMetricId:t.trackMetricId,trackDateRange:t.trackDateRange})),r.a.createElement("div",null,r.a.createElement(W,{className:"BubbleChart",data:a,trackDateRange:t.trackDateRange,trackMetricId:t.trackMetricId,artistId:t.artistId}))))),r.a.createElement("div",{id:"trackSpins",className:"TrackMetrics"},r.a.createElement("div",{className:"TrackMetrics__label"},r.a.createElement("span",null,"Track Spins")),r.a.createElement("div",{className:"TrackMetrics__metrics"},n))},Q=(a(204),function(t){return r.a.createElement("div",{className:"SplashPage"},t.children?r.a.createElement("p",null,t.children):r.a.createElement("p",null,"Welcome to the Artist Metric Quick Search application. This application was written using D3.js + React. The data is retrieved by an API provided by the Next Big Sound. Please search an artist on the top left to begin using the application."))}),G=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(u.a)(this,Object(d.a)(e).call(this,t))).state={artist:"",artistId:"",artistInfo:null,metrics:null,metricMetadata:null,metricId:41,trackMetricId:410,trackMetrics:{},startDate:I()(new Date).subtract(5,"y").unix(),endDate:I()(new Date).unix(),trackDateRange:"TW",isLoaded:!1,isTrackMetricLoading:!0,artistNotFound:!1},a.handleArtistChange=function(t){a.emitDebouncedSearch(t.target.value)},a.handleArtistSearch=function(t){a.setState({artist:t})},a.getChartData=function(t){var e,n=a.state.metrics.data.filter(function(e){return e.metricId===t});if(n.length)return e=41===t||247===t?n[0].timeseries.deltas:n[0].timeseries.totals,Object.keys(e).map(function(t){return{date:new Date(t),value:e[t]}})},a.getTrackData=function(t){if(a.state.trackMetrics[t])return a.state.trackMetrics[t].data.filter(function(t){return t.summary[a.state.trackDateRange]})},a.handleMetricIdChange=function(t){a.state.metricId!==t&&a.setState({metricId:t})},a.onRangeChange=function(t){a.state.startDate===t[0]&&a.state.endDate===t[1]||a.setState({startDate:t[0],endDate:t[1]})},a.handleTrackIdChange=function(t){a.state.trackMetricId!==t&&(413!==t&&414!==t||"LTD"===a.state.trackDateRange&&a.setState({trackDateRange:"TW"}),a.setState({trackMetricId:t}))},a.handleTrackDateRangeChange=function(t){a.state.trackDateRange!==t&&a.setState({trackDateRange:t})},a.emitDebouncedSearch=v()(a.handleArtistSearch,500),a}return Object(m.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.grabMetricMetadata(),this.state.artist&&this.grabArtistMetric()}},{key:"componentDidUpdate",value:function(t,e){this.state.artist&&this.state.artist!==e.artist&&this.grabArtistMetric()}},{key:"resetArtistInfo",value:function(){this.setState({trackMetrics:{},metrics:null,artistInfo:null})}},{key:"grabMetricMetadata",value:function(){var t=this;f.a.get("metrics/?fields=items.*").then(function(e){var a=e.data.items.reduce(function(t,e){return t[e.id]={fullName:e.fullName,description:e.description},t},{});t.setState({metricMetadata:a})}).catch(function(t){return console.log(t,"grabMetricMetadata")})}},{key:"grabArtistMetric",value:function(){var t=this,e=I()(new Date).subtract(5,"y").format("YYYY-MM-DD"),a=I()(new Date).format("YYYY-MM-DD");f.a.get("search/v1/artists/?query=".concat(this.state.artist,"&limit=1")).then(function(n){if(!n.data.artists.length)return t.setState({artistNotFound:!0}),null;t.setState({isLoaded:!0}),t.setState({artistNotFound:!1}),t.resetArtistInfo(),window.scrollTo(0,0);var r=n.data.artists[0];return t.setState({artistId:r.id}),t.grabTrackMetrics(),t.grabArtistInfo(),t.setState({metrics:null}),f.a.get("artists/".concat(r.id,"/data?metricIds=28,41,11,151,247&startDate=").concat(e,"&endDate=").concat(a,"&timeseries=totals,deltas"))}).then(function(e){e&&t.setState({metrics:e.data,metricId:e.data.data[0].metricId})}).catch(function(t){return console.log(t,"grabArtistMetric")})}},{key:"grabArtistInfo",value:function(){var t=this;this.setState({artistInfo:null}),f.a.get("artists/".concat(this.state.artistId,"/")).then(function(e){e&&t.setState({artistInfo:e.data})}).catch(function(t){return console.log(t,"grabArtistInfo")})}},{key:"grabTrackMetrics",value:function(){var t=this;"undefined"!=typeof this._source&&this._source.cancel("Operation canceled due to new request."),this._source=f.a.CancelToken.source(),this.setState({trackMetrics:{},isTrackMetricLoading:!0});[410,411,413,414].forEach(function(e){f.a.get("metrics/v1/entity/".concat(t.state.artistId,"/nestedAssets?metric=").concat(e),{cancelToken:t._source.token}).then(function(a){var n=Object(s.a)({},t.state.trackMetrics);a.data.data?(n[e]=a.data,t.state.isTrackMetricLoading&&t.setState({isTrackMetricLoading:!1,trackMetricId:e})):n[e]=null,t.setState({trackMetrics:n})}).catch(function(t){f.a.isCancel(t)?console.log("Request canceled",t):console.log(t)})})}},{key:"render",value:function(){var t=this.state,e=t.artistId,a=t.artistInfo,n=t.metrics,i=t.metricId,c=t.metricMetadata,s=t.trackMetricId,l=t.trackMetrics,o=t.isLoaded,u=t.startDate,d=t.endDate,m=t.trackDateRange,h=t.artistNotFound;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement(k,{handleArtistChange:this.handleArtistChange}),h?r.a.createElement(Q,null,"The artist was not found."):o?r.a.createElement(r.a.Fragment,null,r.a.createElement(M,{artistInfo:a,isLoaded:o}),r.a.createElement(F,{isLoaded:o,metrics:n,onRangeChange:this.onRangeChange,handleMetricIdChange:this.handleMetricIdChange,metricMetadata:c,getChartData:this.getChartData,metricId:i,startDate:u,endDate:d,artistId:e}),r.a.createElement(J,{isLoaded:o,metricMetadata:c,trackMetricId:s,trackMetrics:l,getTrackData:this.getTrackData,handleTrackIdChange:this.handleTrackIdChange,handleTrackDateRangeChange:this.handleTrackDateRangeChange,trackDateRange:m,artistId:e})):r.a.createElement(Q,null)))}}]),e}(n.Component);f.a.defaults.baseURL="https://api.nextbigsound.com/",f.a.defaults.params={},f.a.defaults.params.access_token="eb74a82009cbc53c9b44866743633f9d",c.a.render(r.a.createElement(G,null),document.getElementById("root"))},90:function(t,e,a){t.exports=a(206)},95:function(t,e,a){},97:function(t,e,a){}},[[90,2,1]]]);
//# sourceMappingURL=main.3f7a6858.chunk.js.map