(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"5cc1f3db04006b66ae74":function(e,a,n){"use strict";n.r(a),n.d(a,"MangoWiki",function(){return x});var i,t=n("8af190b70a6bc55c6f1b"),o=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),c=n("0d7f0986bcd2f33d8a2a"),d=n("32486f6b1f4642cc3170"),r=n("ab4cb61bcb2dc161defb"),u=n("e95a63b25fb92ed15721"),f=n("97e5be8d3e616b60df09"),m=n.n(f),s=n("ec15def0234cb7c142a8"),b=n("adc20f99e57c573c589c"),g=n("d95b0cf107403b178365"),l=n("87c64dcce3b8b421e1dc"),k=n("021ba6545a76dfcb11ca"),p=n("4a3a7aa857ad595a4ad9"),w=n("b2a3a2d222a0d2bfcbc3"),v=n("360cfb0441fb5c7f3f5b"),h=n("9bc8df1e700f3a214b7f"),y=n("76953024a2fd43c1c3d2"),C=n("8ebc84cc241700e878a7"),R=n("895c2194e8a51a8333b5"),M=n("246ddcd6b564fb6755d1");function W(e,a,n,t){i||(i="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(a||0===c||(a={children:void 0}),1===c)a.children=t;else if(c>1){for(var d=new Array(c),r=0;r<c;r++)d[r]=arguments[r+3];a.children=d}if(a&&o)for(var u in o)void 0===a[u]&&(a[u]=o[u]);else a||(a=o||{});return{$$typeof:i,type:e,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}var I=s.Menu.SubMenu,S=m()(u.Link).withConfig({displayName:"MangoWiki__MyLink",componentId:"sc-1yw5ikz-0"})([""]),j=m()(s.Menu.Item).withConfig({displayName:"MangoWiki__MyMI",componentId:"sc-1yw5ikz-1"})([":active{background-color:#fff !important;}"]),F=W(c.Helmet,{},void 0,W("title",{},void 0,"MangoWiki"),W("meta",{name:"description",content:"Description of MangoWiki"})),O=W(s.Col,{span:19},void 0,W(u.Route,{exact:!0,path:"/mangowiki/news/new/:id",component:C.a}),W(u.Route,{exact:!0,path:"/mangowiki/news/:familyId",component:C.a}),W(u.Route,{exact:!0,path:"/mangowiki/news/:familyId/:genusId",component:C.a}),W(u.Route,{exact:!0,path:"/mangowiki/news/:familyId/:genusId/:genusFeatureId",component:C.a}),W(u.Route,{exact:!0,path:"/mangowiki/list",component:y.a}));function x(e){return Object(g.a)({key:"mangoWiki",reducer:k.a}),Object(b.a)({key:"mangoWiki",saga:p.a}),Object(t.useEffect)(function(){e.getCategories(),e.getSubCategories(),e.getHeadquarters(),e.getMarks(),e.getFamilies(),e.getGenera(),e.getGenusFeatures()},[]),W("div",{},void 0,F,W(R.a,{mCont:W("div",{},void 0,W(s.Row,{gutter:16},void 0,W(s.Col,{span:5},void 0,W(M.a,{mCont:W("div",{},void 0,W(s.Menu,{style:{width:230},mode:"inline"},void 0,e.mangoWikiReducer.families&&e.mangoWikiReducer.families.map(function(a){return W(I,{title:W(S,{to:"/mangowiki/news/".concat(a.id)},void 0,"H\u1ecd ",a.name)},"family".concat(a.id),e.mangoWikiReducer.genera&&e.mangoWikiReducer.genera.map(function(n){return W(I,{title:W(S,{to:"/mangowiki/news/".concat(a.id,"/").concat(n.id)},void 0,"Chi ",n.name)},"genus".concat(n.id),e.mangoWikiReducer.genusFeatures&&e.mangoWikiReducer.genusFeatures.map(function(e){return W(j,{},"genusFeature".concat(e.id),W(S,{to:"/mangowiki/news/".concat(a.id,"/").concat(n.id,"/").concat(e.id)},void 0,e.name))}))}))}))),mCategory:"M\u1ee5c l\u1ee5c",mCheck:!0})),O)),mCategories:e.homeReducer.categories,mSubCategories:e.homeReducer.subCategories,mMarks:e.homeReducer.marks,mContacts:e.homeReducer.headquarters,mCheck:!0}))}var _=Object(d.createStructuredSelector)({homeReducer:Object(w.a)(),mangoWikiReducer:Object(l.a)()}),G=Object(o.connect)(_,function(e){return{getCategories:function(a){e(h.a(a))},getSubCategories:function(a){e(h.e(a))},getHeadquarters:function(a){e(h.b(a))},getMarks:function(a){e(h.d(a))},getFamilies:function(a){e(v.a(a))},getGenera:function(a){e(v.b(a))},getGenusFeatures:function(a){e(v.c(a))}}});a.default=Object(r.compose)(G,t.memo)(x)}}]);