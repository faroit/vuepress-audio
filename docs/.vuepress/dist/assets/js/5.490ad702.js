(window.webpackJsonp=window.webpackJsonp||[]).push([[5,10],{251:function(t,i,a){},259:function(t,i){},372:function(t,i,a){"use strict";var s=a(251);a.n(s).a},375:function(t,i,a){"use strict";a.r(i);a(293),a(296);var s=a(297),e=a.n(s),n=(a(43),a(298),a(299),a(39),a(302)),l=function(t){console.log(t),this.playlist=n.init({samplesPerPixel:1400,waveHeight:80,container:t.playlist,timescale:!0,mono:!0,exclSolo:!1,state:"cursor",colors:{waveOutlineColor:"white"},controls:{show:!1,width:160},zoomLevels:[1400]})};l.prototype.loadTargets=function(t){this.playlist.getEventEmitter().emit("stop"),this.playlist.tracks=[];var i=[],a=!0,s=!1,e=void 0;try{for(var n,l=t[Symbol.iterator]();!(a=(n=l.next()).done);a=!0){var o=n.value;i.push({src:"other.m4a",name:o.name,muted:o.mute,soloed:o.solo})}}catch(t){s=!0,e=t}finally{try{a||null==l.return||l.return()}finally{if(s)throw e}}this.playlist.load(i)},l.prototype.addTrack=function(t){this.playlist.load([{src:"other.m4a",name:t.name,muted:t.mute,soloed:t.solo}])};var o=l,r={name:"MultiTrack",props:{urls:Array,title:String},data:function(){return{isPlaying:!1,isLoading:!1,player:Object,loaderColor:"orange",loaderHeight:"26px",playbackPosition:0,lastplaybackPosition:0}},mounted:function(){e.a.bind("3",this.playpause),this.player=new o(this.$refs),this.player.playlist.getEventEmitter().on("audiosourcesloaded",this.audioLoaded),this.player.playlist.getEventEmitter().on("timeupdate",this.updateTime),this.update_tracks()},beforeDestroy:function(){e.a.unbind("3");for(var t=0;t<this.player.playlist.tracks.length;++t)!function(t){e.a.unbind(String(t+1))}(t);this.stop(),delete this.player},methods:{update_tracks:function(){if(1!=this.isLoading){this.saveState(),this.stop(),this.isLoading=!0,this.player.loadTargets(this.urls);for(var t=0;t<this.urls.length;++t)!function(t,i){e.a.bind(String(t+1),function(){i.player.playlist.getEventEmitter().emit("solo",i.player.playlist.tracks[t])}),e.a.bind(["ctrl+"+String(t+1),"meta+"+String(t+1)],function(){i.player.playlist.getEventEmitter().emit("mute",i.player.playlist.tracks[t])})}(t,this)}},addTrack:function(t){this.isLoading=!0,this.player.addTrack(t)},saveState:function(){this.lastplaybackPosition=this.playbackPosition},playpause:function(t){return this.isPlaying?this.player.playlist.getEventEmitter().emit("pause"):(this.player.playlist.getEventEmitter().emit("play"),this.player.playlist.getEventEmitter().on("finished",this.stop)),this.isPlaying=!this.isPlaying,t.stopPropagation(),!1},stop:function(){this.player.playlist.getEventEmitter().emit("stop"),this.isPlaying=!1},toggleMode:function(){this.$emit("toggleMode","foo")},audioLoaded:function(){var t=this;this.$nextTick(function(){return t.$refs.playbutton.focus()}),this.isLoading=!1},updateTime:function(t){this.playbackPosition=t}},watch:{urls:{handler:"update_tracks",deep:!0}}},p=(a(372),a(38)),c=Object(p.a)(r,function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"player"}},[a("div",[a("div",{ref:"playbutton",staticClass:"column is-narrow"},[t._m(0),t._v(" "),a("span",{staticClass:"buttons"},[a("a",{staticClass:"button is-success",class:{"is-active":t.isPlaying,"is-disabled":t.isLoading},on:{click:t.playpause}},[a("span",{class:t.isPlaying?"fa fa-pause":"fa fa-play"})]),t._v(" "),a("a",{staticClass:"button is-danger",class:{"is-disabled":t.isLoading},on:{click:t.stop}},[a("span",{staticClass:"fa fa-stop"})])])])]),t._v(" "),a("div",{ref:"playlist"})])},[function(){var t=this.$createElement,i=this._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fa fa-keyboard"})])}],!1,null,"4e3f2254",null);i.default=c.exports}}]);