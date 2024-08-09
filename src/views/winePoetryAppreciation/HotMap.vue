<template>
  <div class="hotMap">
    <div id="all">
      <div id="container">
        <div
          id="container1"
          ref="container1"
        ></div>
        <div id="container2">
          <div
            class="con1"
            id="container21"
            ref="container21"
          ></div>
          <div
            class="con2"
            id="container22"
            ref="container22"
          ></div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="textInfo">
      <img
        class="imgInfo"
        src="@/assets/images/infoAppreciation4.png"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Column, Bar, Heatmap } from "@antv/g2plot";
import { onMounted, reactive, ref } from "vue";

let data1 = [
  { type: "山", value: 709 },
  { type: "云", value: 573 },
  { type: "天", value: 514 },
  { type: "风", value: 833 },
  { type: "水", value: 522 },
  { type: "花", value: 710 },
  { type: "月", value: 564 },
  { type: "雪", value: 274 },
  { type: "雨", value: 335 },
  { type: "竹", value: 250 },
  { type: "草", value: 276 },
  { type: "烟", value: 241 },
  { type: "柳", value: 195 },
  { type: "鸟", value: 181 },
  { type: "琴", value: 156 },
  { type: "松", value: 178 },
  { type: "霜", value: 181 },
  { type: "露", value: 127 },
];
let data2 = [
  { name: "陆龟蒙", value: 233 },
  { name: "韩偓", value: 162 },
  { name: "皮日休", value: 175 },
  { name: "罗隐", value: 192 },
  { name: "温庭筠", value: 74 },
  { name: "李商隐", value: 184 },
  { name: "韦庄", value: 208 },
  { name: "杜牧", value: 249 },
  { name: "许浑", value: 346 },
  { name: "李贺", value: 207 },
  { name: "元稹", value: 316 },
  { name: "姚合", value: 346 },
  { name: "白居易", value: 1557 },
  { name: "刘禹锡", value: 259 },
  { name: "韩愈", value: 242 },
  { name: "钱起", value: 162 },
  { name: "岑参", value: 334 },
  { name: "杜甫", value: 566 },
  { name: "高适", value: 130 },
  { name: "李白", value: 673 },
  { name: "宋之问", value: 73 },
  { name: "卢照邻", value: 61 },
  { name: "王绩", value: 70 },
];
let data3 = [
  { type: "山", name: "陆龟蒙", value: 21 },
  { type: "云", name: "陆龟蒙", value: 21 },
  { type: "天", name: "陆龟蒙", value: 18 },
  { type: "风", name: "陆龟蒙", value: 35 },
  { type: "水", name: "陆龟蒙", value: 9 },
  { type: "花", name: "陆龟蒙", value: 19 },
  { type: "月", name: "陆龟蒙", value: 18 },
  { type: "雪", name: "陆龟蒙", value: 7 },
  { type: "雨", name: "陆龟蒙", value: 12 },
  { type: "竹", name: "陆龟蒙", value: 8 },
  { type: "草", name: "陆龟蒙", value: 8 },
  { type: "烟", name: "陆龟蒙", value: 21 },
  { type: "柳", name: "陆龟蒙", value: 5 },
  { type: "鸟", name: "陆龟蒙", value: 5 },
  { type: "琴", name: "陆龟蒙", value: 7 },
  { type: "松", name: "陆龟蒙", value: 6 },
  { type: "霜", name: "陆龟蒙", value: 7 },
  { type: "露", name: "陆龟蒙", value: 6 },
  { type: "山", name: "韩偓", value: 8 },
  { type: "云", name: "韩偓", value: 5 },
  { type: "天", name: "韩偓", value: 12 },
  { type: "风", name: "韩偓", value: 26 },
  { type: "水", name: "韩偓", value: 7 },
  { type: "花", name: "韩偓", value: 28 },
  { type: "月", name: "韩偓", value: 16 },
  { type: "雪", name: "韩偓", value: 8 },
  { type: "雨", name: "韩偓", value: 21 },
  { type: "竹", name: "韩偓", value: 4 },
  { type: "草", name: "韩偓", value: 5 },
  { type: "烟", name: "韩偓", value: 5 },
  { type: "柳", name: "韩偓", value: 7 },
  { type: "鸟", name: "韩偓", value: 1 },
  { type: "琴", name: "韩偓", value: 2 },
  { type: "松", name: "韩偓", value: 0 },
  { type: "霜", name: "韩偓", value: 3 },
  { type: "露", name: "韩偓", value: 4 },

  { type: "山", name: "皮日休", value: 19 },
  { type: "云", name: "皮日休", value: 15 },
  { type: "天", name: "皮日休", value: 15 },
  { type: "风", name: "皮日休", value: 14 },
  { type: "水", name: "皮日休", value: 6 },
  { type: "花", name: "皮日休", value: 16 },
  { type: "月", name: "皮日休", value: 15 },
  { type: "雪", name: "皮日休", value: 3 },
  { type: "雨", name: "皮日休", value: 10 },
  { type: "竹", name: "皮日休", value: 11 },
  { type: "草", name: "皮日休", value: 7 },
  { type: "烟", name: "皮日休", value: 12 },
  { type: "柳", name: "皮日休", value: 4 },
  { type: "鸟", name: "皮日休", value: 5 },
  { type: "琴", name: "皮日休", value: 7 },
  { type: "松", name: "皮日休", value: 11 },
  { type: "霜", name: "皮日休", value: 3 },
  { type: "露", name: "皮日休", value: 2 },
  { type: "山", name: "罗隐", value: 18 },
  { type: "云", name: "罗隐", value: 13 },
  { type: "天", name: "罗隐", value: 7 },
  { type: "风", name: "罗隐", value: 30 },
  { type: "水", name: "罗隐", value: 13 },
  { type: "花", name: "罗隐", value: 16 },
  { type: "月", name: "罗隐", value: 21 },
  { type: "雪", name: "罗隐", value: 11 },
  { type: "雨", name: "罗隐", value: 16 },
  { type: "竹", name: "罗隐", value: 2 },
  { type: "草", name: "罗隐", value: 5 },
  { type: "烟", name: "罗隐", value: 7 },
  { type: "柳", name: "罗隐", value: 10 },
  { type: "鸟", name: "罗隐", value: 2 },
  { type: "琴", name: "罗隐", value: 3 },
  { type: "松", name: "罗隐", value: 5 },
  { type: "霜", name: "罗隐", value: 8 },
  { type: "露", name: "罗隐", value: 5 },
  { type: "山", name: "温庭筠", value: 6 },
  { type: "云", name: "温庭筠", value: 4 },
  { type: "天", name: "温庭筠", value: 3 },
  { type: "风", name: "温庭筠", value: 9 },
  { type: "水", name: "温庭筠", value: 7 },
  { type: "花", name: "温庭筠", value: 9 },
  { type: "月", name: "温庭筠", value: 10 },
  { type: "雪", name: "温庭筠", value: 1 },
  { type: "雨", name: "温庭筠", value: 2 },
  { type: "竹", name: "温庭筠", value: 1 },
  { type: "草", name: "温庭筠", value: 6 },
  { type: "烟", name: "温庭筠", value: 4 },
  { type: "柳", name: "温庭筠", value: 5 },
  { type: "鸟", name: "温庭筠", value: 1 },
  { type: "琴", name: "温庭筠", value: 2 },
  { type: "松", name: "温庭筠", value: 3 },
  { type: "霜", name: "温庭筠", value: 0 },
  { type: "露", name: "温庭筠", value: 1 },
  { type: "山", name: "李商隐", value: 14 },
  { type: "云", name: "李商隐", value: 13 },
  { type: "天", name: "李商隐", value: 12 },
  { type: "风", name: "李商隐", value: 23 },
  { type: "水", name: "李商隐", value: 8 },
  { type: "花", name: "李商隐", value: 17 },
  { type: "月", name: "李商隐", value: 18 },
  { type: "雪", name: "李商隐", value: 10 },
  { type: "雨", name: "李商隐", value: 8 },
  { type: "竹", name: "李商隐", value: 9 },
  { type: "草", name: "李商隐", value: 6 },
  { type: "烟", name: "李商隐", value: 6 },
  { type: "柳", name: "李商隐", value: 8 },
  { type: "鸟", name: "李商隐", value: 5 },
  { type: "琴", name: "李商隐", value: 6 },
  { type: "松", name: "李商隐", value: 10 },
  { type: "霜", name: "李商隐", value: 6 },
  { type: "露", name: "李商隐", value: 5 },
  { type: "山", name: "韦庄", value: 19 },
  { type: "云", name: "韦庄", value: 14 },
  { type: "天", name: "韦庄", value: 10 },
  { type: "风", name: "韦庄", value: 18 },
  { type: "水", name: "韦庄", value: 14 },
  { type: "花", name: "韦庄", value: 32 },
  { type: "月", name: "韦庄", value: 14 },
  { type: "雪", name: "韦庄", value: 13 },
  { type: "雨", name: "韦庄", value: 16 },
  { type: "竹", name: "韦庄", value: 5 },
  { type: "草", name: "韦庄", value: 6 },
  { type: "烟", name: "韦庄", value: 13 },
  { type: "柳", name: "韦庄", value: 10 },
  { type: "鸟", name: "韦庄", value: 10 },
  { type: "琴", name: "韦庄", value: 2 },
  { type: "松", name: "韦庄", value: 3 },
  { type: "霜", name: "韦庄", value: 3 },
  { type: "露", name: "韦庄", value: 6 },
  { type: "山", name: "杜牧", value: 22 },
  { type: "云", name: "杜牧", value: 25 },
  { type: "天", name: "杜牧", value: 12 },
  { type: "风", name: "杜牧", value: 26 },
  { type: "水", name: "杜牧", value: 26 },
  { type: "花", name: "杜牧", value: 23 },
  { type: "月", name: "杜牧", value: 18 },
  { type: "雪", name: "杜牧", value: 13 },
  { type: "雨", name: "杜牧", value: 17 },
  { type: "竹", name: "杜牧", value: 6 },
  { type: "草", name: "杜牧", value: 9 },
  { type: "烟", name: "杜牧", value: 18 },
  { type: "柳", name: "杜牧", value: 10 },
  { type: "鸟", name: "杜牧", value: 8 },
  { type: "琴", name: "杜牧", value: 2 },
  { type: "松", name: "杜牧", value: 8 },
  { type: "霜", name: "杜牧", value: 2 },
  { type: "露", name: "杜牧", value: 4 },
  { type: "山", name: "许浑", value: 53 },
  { type: "云", name: "许浑", value: 26 },
  { type: "天", name: "许浑", value: 8 },
  { type: "风", name: "许浑", value: 40 },
  { type: "水", name: "许浑", value: 34 },
  { type: "花", name: "许浑", value: 38 },
  { type: "月", name: "许浑", value: 30 },
  { type: "雪", name: "许浑", value: 14 },
  { type: "雨", name: "许浑", value: 19 },
  { type: "竹", name: "许浑", value: 9 },
  { type: "草", name: "许浑", value: 12 },
  { type: "烟", name: "许浑", value: 5 },
  { type: "柳", name: "许浑", value: 9 },
  { type: "鸟", name: "许浑", value: 10 },
  { type: "琴", name: "许浑", value: 12 },
  { type: "松", name: "许浑", value: 9 },
  { type: "霜", name: "许浑", value: 7 },
  { type: "露", name: "许浑", value: 11 },
  { type: "山", name: "李贺", value: 14 },
  { type: "云", name: "李贺", value: 22 },
  { type: "天", name: "李贺", value: 20 },
  { type: "风", name: "李贺", value: 21 },
  { type: "水", name: "李贺", value: 17 },
  { type: "花", name: "李贺", value: 19 },
  { type: "月", name: "李贺", value: 15 },
  { type: "雪", name: "李贺", value: 1 },
  { type: "雨", name: "李贺", value: 8 },
  { type: "竹", name: "李贺", value: 9 },
  { type: "草", name: "李贺", value: 11 },
  { type: "烟", name: "李贺", value: 13 },
  { type: "柳", name: "李贺", value: 12 },
  { type: "鸟", name: "李贺", value: 2 },
  { type: "琴", name: "李贺", value: 2 },
  { type: "松", name: "李贺", value: 4 },
  { type: "霜", name: "李贺", value: 5 },
  { type: "露", name: "李贺", value: 12 },
  { type: "山", name: "元稹", value: 23 },
  { type: "云", name: "元稹", value: 22 },
  { type: "天", name: "元稹", value: 29 },
  { type: "风", name: "元稹", value: 44 },
  { type: "水", name: "元稹", value: 25 },
  { type: "花", name: "元稹", value: 31 },
  { type: "月", name: "元稹", value: 29 },
  { type: "雪", name: "元稹", value: 15 },
  { type: "雨", name: "元稹", value: 18 },
  { type: "竹", name: "元稹", value: 15 },
  { type: "草", name: "元稹", value: 12 },
  { type: "烟", name: "元稹", value: 7 },
  { type: "柳", name: "元稹", value: 8 },
  { type: "鸟", name: "元稹", value: 8 },
  { type: "琴", name: "元稹", value: 3 },
  { type: "松", name: "元稹", value: 7 },
  { type: "霜", name: "元稹", value: 11 },
  { type: "露", name: "元稹", value: 9 },
  { type: "山", name: "姚合", value: 60 },
  { type: "云", name: "姚合", value: 21 },
  { type: "天", name: "姚合", value: 21 },
  { type: "风", name: "姚合", value: 47 },
  { type: "水", name: "姚合", value: 27 },
  { type: "花", name: "姚合", value: 34 },
  { type: "月", name: "姚合", value: 14 },
  { type: "雪", name: "姚合", value: 7 },
  { type: "雨", name: "姚合", value: 19 },
  { type: "竹", name: "姚合", value: 21 },
  { type: "草", name: "姚合", value: 10 },
  { type: "烟", name: "姚合", value: 16 },
  { type: "柳", name: "姚合", value: 4 },
  { type: "鸟", name: "姚合", value: 13 },
  { type: "琴", name: "姚合", value: 8 },
  { type: "松", name: "姚合", value: 11 },
  { type: "霜", name: "姚合", value: 6 },
  { type: "露", name: "姚合", value: 7 },
  { type: "山", name: "白居易", value: 131 },
  { type: "云", name: "白居易", value: 98 },
  { type: "天", name: "白居易", value: 124 },
  { type: "风", name: "白居易", value: 206 },
  { type: "水", name: "白居易", value: 138 },
  { type: "花", name: "白居易", value: 191 },
  { type: "月", name: "白居易", value: 125 },
  { type: "雪", name: "白居易", value: 81 },
  { type: "雨", name: "白居易", value: 65 },
  { type: "竹", name: "白居易", value: 69 },
  { type: "草", name: "白居易", value: 48 },
  { type: "烟", name: "白居易", value: 53 },
  { type: "柳", name: "白居易", value: 41 },
  { type: "鸟", name: "白居易", value: 36 },
  { type: "琴", name: "白居易", value: 47 },
  { type: "松", name: "白居易", value: 34 },
  { type: "霜", name: "白居易", value: 46 },
  { type: "露", name: "白居易", value: 24 },
  { type: "山", name: "刘禹锡", value: 25 },
  { type: "云", name: "刘禹锡", value: 22 },
  { type: "天", name: "刘禹锡", value: 18 },
  { type: "风", name: "刘禹锡", value: 33 },
  { type: "水", name: "刘禹锡", value: 23 },
  { type: "花", name: "刘禹锡", value: 25 },
  { type: "月", name: "刘禹锡", value: 17 },
  { type: "雪", name: "刘禹锡", value: 11 },
  { type: "雨", name: "刘禹锡", value: 14 },
  { type: "竹", name: "刘禹锡", value: 11 },
  { type: "草", name: "刘禹锡", value: 13 },
  { type: "烟", name: "刘禹锡", value: 11 },
  { type: "柳", name: "刘禹锡", value: 4 },
  { type: "鸟", name: "刘禹锡", value: 2 },
  { type: "琴", name: "刘禹锡", value: 6 },
  { type: "松", name: "刘禹锡", value: 10 },
  { type: "霜", name: "刘禹锡", value: 5 },
  { type: "露", name: "刘禹锡", value: 9 },
  { type: "山", name: "韩愈", value: 23 },
  { type: "云", name: "韩愈", value: 23 },
  { type: "天", name: "韩愈", value: 33 },
  { type: "风", name: "韩愈", value: 27 },
  { type: "水", name: "韩愈", value: 23 },
  { type: "花", name: "韩愈", value: 16 },
  { type: "月", name: "韩愈", value: 24 },
  { type: "雪", name: "韩愈", value: 11 },
  { type: "雨", name: "韩愈", value: 8 },
  { type: "竹", name: "韩愈", value: 10 },
  { type: "草", name: "韩愈", value: 11 },
  { type: "烟", name: "韩愈", value: 4 },
  { type: "柳", name: "韩愈", value: 3 },
  { type: "鸟", name: "韩愈", value: 7 },
  { type: "琴", name: "韩愈", value: 1 },
  { type: "松", name: "韩愈", value: 6 },
  { type: "霜", name: "韩愈", value: 9 },
  { type: "露", name: "韩愈", value: 3 },

  { type: "山", name: "钱起", value: 25 },
  { type: "云", name: "钱起", value: 29 },
  { type: "天", name: "钱起", value: 8 },
  { type: "风", name: "钱起", value: 11 },
  { type: "水", name: "钱起", value: 9 },
  { type: "花", name: "钱起", value: 19 },
  { type: "月", name: "钱起", value: 12 },
  { type: "雪", name: "钱起", value: 4 },
  { type: "雨", name: "钱起", value: 4 },
  { type: "竹", name: "钱起", value: 7 },
  { type: "草", name: "钱起", value: 8 },
  { type: "烟", name: "钱起", value: 7 },
  { type: "柳", name: "钱起", value: 4 },
  { type: "鸟", name: "钱起", value: 4 },
  { type: "琴", name: "钱起", value: 3 },
  { type: "松", name: "钱起", value: 4 },
  { type: "霜", name: "钱起", value: 1 },
  { type: "露", name: "钱起", value: 3 },

  { type: "山", name: "岑参", value: 43 },
  { type: "云", name: "岑参", value: 36 },
  { type: "天", name: "岑参", value: 24 },
  { type: "风", name: "岑参", value: 26 },
  { type: "水", name: "岑参", value: 16 },
  { type: "花", name: "岑参", value: 39 },
  { type: "月", name: "岑参", value: 31 },
  { type: "雪", name: "岑参", value: 12 },
  { type: "雨", name: "岑参", value: 26 },
  { type: "竹", name: "岑参", value: 9 },
  { type: "草", name: "岑参", value: 27 },
  { type: "烟", name: "岑参", value: 2 },
  { type: "柳", name: "岑参", value: 11 },
  { type: "鸟", name: "岑参", value: 13 },
  { type: "琴", name: "岑参", value: 4 },
  { type: "松", name: "岑参", value: 6 },
  { type: "霜", name: "岑参", value: 7 },
  { type: "露", name: "岑参", value: 2 },
  { type: "山", name: "杜甫", value: 58 },
  { type: "云", name: "杜甫", value: 63 },
  { type: "天", name: "杜甫", value: 55 },
  { type: "风", name: "杜甫", value: 75 },
  { type: "水", name: "杜甫", value: 41 },
  { type: "花", name: "杜甫", value: 52 },
  { type: "月", name: "杜甫", value: 32 },
  { type: "雪", name: "杜甫", value: 19 },
  { type: "雨", name: "杜甫", value: 27 },
  { type: "竹", name: "杜甫", value: 21 },
  { type: "草", name: "杜甫", value: 31 },
  { type: "烟", name: "杜甫", value: 13 },
  { type: "柳", name: "杜甫", value: 10 },
  { type: "鸟", name: "杜甫", value: 21 },
  { type: "琴", name: "杜甫", value: 7 },
  { type: "松", name: "杜甫", value: 13 },
  { type: "霜", name: "杜甫", value: 20 },
  { type: "露", name: "杜甫", value: 8 },
  { type: "山", name: "高适", value: 16 },
  { type: "云", name: "高适", value: 22 },
  { type: "天", name: "高适", value: 10 },
  { type: "风", name: "高适", value: 21 },
  { type: "水", name: "高适", value: 7 },
  { type: "花", name: "高适", value: 6 },
  { type: "月", name: "高适", value: 14 },
  { type: "雪", name: "高适", value: 5 },
  { type: "雨", name: "高适", value: 5 },
  { type: "竹", name: "高适", value: 2 },
  { type: "草", name: "高适", value: 5 },
  { type: "烟", name: "高适", value: 0 },
  { type: "柳", name: "高适", value: 7 },
  { type: "鸟", name: "高适", value: 4 },
  { type: "琴", name: "高适", value: 2 },
  { type: "松", name: "高适", value: 1 },
  { type: "霜", name: "高适", value: 2 },
  { type: "露", name: "高适", value: 1 },
  { type: "山", name: "李白", value: 83 },
  { type: "云", name: "李白", value: 60 },
  { type: "天", name: "李白", value: 65 },
  { type: "风", name: "李白", value: 82 },
  { type: "水", name: "李白", value: 59 },
  { type: "花", name: "李白", value: 57 },
  { type: "月", name: "李白", value: 77 },
  { type: "雪", name: "李白", value: 23 },
  { type: "雨", name: "李白", value: 16 },
  { type: "竹", name: "李白", value: 12 },
  { type: "草", name: "李白", value: 29 },
  { type: "烟", name: "李白", value: 14 },
  { type: "柳", name: "李白", value: 16 },
  { type: "鸟", name: "李白", value: 15 },
  { type: "琴", name: "李白", value: 15 },
  { type: "松", name: "李白", value: 20 },
  { type: "霜", name: "李白", value: 27 },
  { type: "露", name: "李白", value: 3 },
  { type: "山", name: "宋之问", value: 8 },
  { type: "云", name: "宋之问", value: 9 },
  { type: "天", name: "宋之问", value: 7 },
  { type: "风", name: "宋之问", value: 6 },
  { type: "水", name: "宋之问", value: 4 },
  { type: "花", name: "宋之问", value: 7 },
  { type: "月", name: "宋之问", value: 2 },
  { type: "雪", name: "宋之问", value: 1 },
  { type: "雨", name: "宋之问", value: 4 },
  { type: "竹", name: "宋之问", value: 2 },
  { type: "草", name: "宋之问", value: 3 },
  { type: "烟", name: "宋之问", value: 3 },
  { type: "柳", name: "宋之问", value: 5 },
  { type: "鸟", name: "宋之问", value: 4 },
  { type: "琴", name: "宋之问", value: 4 },
  { type: "松", name: "宋之问", value: 2 },
  { type: "霜", name: "宋之问", value: 1 },
  { type: "露", name: "宋之问", value: 1 },
  { type: "山", name: "卢照邻", value: 5 },
  { type: "云", name: "卢照邻", value: 7 },
  { type: "天", name: "卢照邻", value: 2 },
  { type: "风", name: "卢照邻", value: 8 },
  { type: "水", name: "卢照邻", value: 6 },
  { type: "花", name: "卢照邻", value: 7 },
  { type: "月", name: "卢照邻", value: 6 },
  { type: "雪", name: "卢照邻", value: 2 },
  { type: "雨", name: "卢照邻", value: 0 },
  { type: "竹", name: "卢照邻", value: 2 },
  { type: "草", name: "卢照邻", value: 2 },
  { type: "烟", name: "卢照邻", value: 5 },
  { type: "柳", name: "卢照邻", value: 0 },
  { type: "鸟", name: "卢照邻", value: 3 },
  { type: "琴", name: "卢照邻", value: 2 },
  { type: "松", name: "卢照邻", value: 1 },
  { type: "霜", name: "卢照邻", value: 2 },
  { type: "露", name: "卢照邻", value: 1 },
  { type: "山", name: "王绩", value: 15 },
  { type: "云", name: "王绩", value: 3 },
  { type: "天", name: "王绩", value: 1 },
  { type: "风", name: "王绩", value: 5 },
  { type: "水", name: "王绩", value: 3 },
  { type: "花", name: "王绩", value: 9 },
  { type: "月", name: "王绩", value: 6 },
  { type: "雪", name: "王绩", value: 2 },
  { type: "雨", name: "王绩", value: 0 },
  { type: "竹", name: "王绩", value: 5 },
  { type: "草", name: "王绩", value: 2 },
  { type: "烟", name: "王绩", value: 2 },
  { type: "柳", name: "王绩", value: 2 },
  { type: "鸟", name: "王绩", value: 2 },
  { type: "琴", name: "王绩", value: 9 },
  { type: "松", name: "王绩", value: 4 },
  { type: "霜", name: "王绩", value: 0 },
  { type: "露", name: "王绩", value: 0 },
];
const initBarChart = (data: any) => {
  //   console.log("container1.value", container1.value);
  const columnPlot = new Column("container1", {
    data,
    xField: "type",
    yField: "value",
    autoFit: true,
    // height:20,
    xAxis: {
      tickLine: null,
      subTickline: null,
      line: null,
    },
    // xAxis:false,
    yAxis: {
      tickLine: null,
      subTickline: null,
      label: null,
      grid: {
        line: null,
      },
      line: null,
    },
    color: ({ type }) => {
      if (type === "琴" || type === "露") {
        return "rgb(229,161,111)"; //数据为70-150
      } else if (
        type === "山" ||
        type === "云" ||
        type === "天" ||
        type === "风" ||
        type === "水" ||
        type === "花" ||
        type === "月"
      ) {
        return "rgb(184,68,13)"; //数据为300以上
      }
      return "rgb(215,97,30)"; //数据为150-300
    },

    label: {
      //   position: "top",
      //   offsetY: 6,
      // 可手动配置 label 数据标签位置
      //  position: 'middle', // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      style: {
        fill: "rgb(98,98,98)",
        // fontSize: 10
      },
      layout: [
        // 柱形图数据标签位置自动调整
        { type: "interval-adjust-position" },
        // 数据标签防遮挡
        { type: "limitInShape" },
        //   // 数据标签文颜色自动调整
        //   { type: 'adjust-color' },
      ],
    },

    // label: {

    //     // 可手动配置 label 数据标签位置
    //     position: 'middle', // 'top', 'bottom', 'middle',
    //     // 配置样式
    //     style: {
    //         fill: '#FFFFFF',
    //         opacity: 0.6,
    //     },
    // },
    // xAxis: {
    //     label: {
    //         autoHide: true,
    //         autoRotate: false,
    //     },
    // },
    // meta: {
    //     type: {
    //         alias: '类别',
    //     },
    //     value: {
    //         alias: '销售额',
    //     },
    // },
  });

  columnPlot.render();
};
const initBarChart2 = (data: any) => {
  const bar = new Bar("container21", {
    data,
    xField: "value",
    yField: "name",
    xAxis: false,
    yAxis: {
      tickLine: null,
      subTickline: null,

      line: null,
    },

    label: {
      //   offsetX: -36,
      // 可手动配置 label 数据标签位置
      //   position: 'right', // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      style: {
        fill: "rgb(98,98,98)",
        // fontSize: 10
      },
      layout: [
        // 柱形图数据标签位置自动调整
        { type: "interval-adjust-position" },
        // 数据标签防遮挡
        { type: "limitInShape" },
        //   // 数据标签文颜色自动调整
        //    { type: 'adjust-color' },
      ],
    },

    color: ({ name }) => {
      if (name === "王绩" || name === "卢照邻") {
        return "rgb(241,209,175)"; //数据为70及以下
      } else if (name === "高适" || name === "温庭筠") {
        return "rgb(229,161,111)"; //数据为70-150
      } else if (
        name === "杜甫" ||
        name === "白居易" ||
        name === "岑参" ||
        name === "李白" ||
        name === "许浑" ||
        name === "姚合" ||
        name === "元稹"
      ) {
        return "rgb(184,68,13)"; //数据为300以上
      }
      return "rgb(215,97,30)"; //数据为150-300
    },
    // color:[ '#5fa4cd', '#2e7ab6', '#114d90','rgb(69,96,30)'],
    //   label: {
    //     // offsetX:-5,
    //     //   offsetY:20,

    // // 可手动配置 label 数据标签位置
    // position:'middle', // 'top', 'bottom', 'middle',
    // // 配置样式
    // style: {
    //     fill: 'red',
    //     opacity: 0.6,
    // },
    //  },
    // yAxis:false,

    // seriesField: 'name',
    // legend: {
    //     position: 'top-left',
    // },
    coordinate: [{ type: "reflectX" }, { type: "reflectY" }],
  });

  bar.render();
};
const initBarChart3 = (data: any) => {
  const heatmapPlot = new Heatmap("container22", {
    data,
    xField: "type",
    yField: "name",
    xAxis: false,
    yAxis: false,
    colorField: "value",
    // legend:
    //                     yAxis:{
    //   text:null,
    //   grid:null,
    // },
    // sizeField: 'value',

    shape: "square",
    color: [
      "rgb(241,209,175)",
      "rgb(229,161,111)",
      "rgb(215,97,30)",
      "rgb(184,68,13)",
    ],
    // label: {
    //     style: {
    //         fill: '#fff',
    //         shadowBlur: 2,
    //         shadowColor: 'rgba(0, 0, 0, .45)',
    //     },
    // },
  });
  heatmapPlot.render();
};
onMounted(() => {
  initBarChart(data1);
  initBarChart2(data2);
  initBarChart3(data3);
});
</script>

<style lang="less" scoped>
.hotMap {
  #all {
    margin: 30vh 0 0 15vw;
    background-color: #f6f3e5;
    width: 48vw;
    border-radius: 20px;
    #container {
      height: 100vh;
      // margin-left: 10vw;
      #container1 {
        position: relative;
        width: 35vw;
        height: 7vw;
        /* top: 30px; */
        margin-left: 10vw;
      }

      #container2 {
        position: relative;
        display: flex;
        /* top: 30px; */
        // max-width: 2000px;
        margin-left: 50px;
        .con1 {
          width: 7vw;
          height: 80vh;
          /* top:10%; */
        }

        .con2 {
          width: 35vw;
          height: 80vh;
        }
      }
    }
  }
  .textInfo {
    width: 22vw;
    height: 80vh;
    // background-color: #f6f3e5;
    margin: -75vh 0 0 65vw;
    .imgInfo {
      width: 80%;
      // margin: -90vh 0 0 50vw;
    }
  }
}
</style>
