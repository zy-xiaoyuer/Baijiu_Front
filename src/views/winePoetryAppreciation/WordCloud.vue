<template>
  <div class="wordCloud">
    <div class="title">
      <img
        class="titleImg"
        src="@/assets/images/titleAppreciation3.png"
      />
    </div>
    <!-- 分割线 -->
    <div id="all">
      <!-- <div>111</div> -->
      <div
        class="container"
        style="display: flex"
      >
        <div class="items">
          <div
            id="main"
            class="main"
          ></div>
          <div
            id="王绩"
            class="name"
          >
            王绩
          </div>
        </div>
        <div class="items">
          <div
            id="main1"
            class="main"
          ></div>
          <div
            id="宋之问"
            class="name"
          >
            宋之问
          </div>
        </div>
        <div class="items">
          <div
            id="main2"
            class="main"
          ></div>
          <div
            id="卢照邻"
            class="name"
          >
            卢照邻
          </div>
        </div>
        <div
          id="初唐"
          class="name1"
        >
          初唐
        </div>
      </div>
      <div
        class="container"
        style="display: flex"
      >
        <div class="items">
          <div
            id="main3"
            class="main"
          ></div>
          <div
            id="杜甫"
            class="name"
          >
            杜甫
          </div>
        </div>
        <div class="items">
          <div
            id="main4"
            class="main"
          ></div>
          <div
            id="李白"
            class="name"
          >
            李白
          </div>
        </div>
        <div class="items">
          <div
            id="main5"
            class="main"
          ></div>
          <div
            id="岑参"
            class="name"
          >
            岑参
          </div>
        </div>
        <div
          id="盛唐"
          class="name1"
        >
          盛唐
        </div>
      </div>
      <div
        class="container"
        style="display: flex"
      >
        <div class="items">
          <div
            id="main6"
            class="main"
          ></div>
          <div
            id="白居易"
            class="name"
          >
            白居易
          </div>
        </div>
        <div class="items">
          <div
            id="main7"
            class="main"
          ></div>
          <div
            id="刘禹锡"
            class="name"
          >
            刘禹锡
          </div>
        </div>
        <div class="items">
          <div
            id="main8"
            class="main"
          ></div>
          <div
            id="韩愈"
            class="name"
          >
            韩愈
          </div>
        </div>
        <div
          id="中唐"
          class="name1"
        >
          中唐
        </div>
      </div>
      <div
        class="container"
        style="display: flex"
      >
        <div class="items">
          <div
            id="main9"
            class="main"
          ></div>
          <div
            id="杜牧"
            class="name"
          >
            杜牧
          </div>
        </div>
        <div class="items">
          <div
            id="main10"
            class="main"
          ></div>
          <div
            id="李商隐"
            class="name"
          >
            李商隐
          </div>
        </div>
        <div class="items">
          <div
            id="main11"
            class="main"
          ></div>
          <div
            id="温庭筠"
            class="name"
          >
            温庭筠
          </div>
        </div>
        <div
          id="晚唐"
          class="name1"
        >
          晚唐
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="textInfo">
      <img
        class="imgInfo"
        src="@/assets/images/infoAppreciation3.png"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, reactive, onUnmounted } from "vue";
import "echarts-gl"; // 引入echarts
// import "@/assets/js/echarts-wordcloud.js";
import "echarts-wordcloud";

// 监听窗口变化
// let nowClientWidth = document.documentElement.clientWidth;
// console.log(nowClientWidth);

const nowClientWidth = reactive({
  value: window.innerWidth,
});

function handleResize() {
  nowClientWidth.value = window.innerWidth;
  initWordChat();
  console.log(nowSize(2));
}

const nowSize = (val: number) => {
  const initWidth = 1920;
  return val * (nowClientWidth.value / initWidth);
};

onMounted(() => {
  initWordChat();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
// let radio = reactive(1);
var dataStyle = {
  normal: {
    label: { show: false },
    labelLine: { show: false },
    borderWidth: 5,
    // borderColor: "#fffafa",
    // shadowBlur: 40,
    // shadowColor: 'rgba(40, 40, 40, 0.5)',
  },
};
var placeHolderStyle = {
  normal: {
    color: "rgba(0,0,0,0)",
    label: { show: false },
    labelLine: { show: false },
  },
  emphasis: {
    color: "rgba(0,0,0,0)",
  },
};

var data = {
  value: [
    { name: "春酒 ", value: "5" },
    { name: "百年 ", value: "3" },
    { name: "山中 ", value: "3" },
    { name: "相看 ", value: "2" },
    { name: "春来 ", value: "2" },
    { name: "方知 ", value: "2" },
    { name: "无人 ", value: "2" },
    { name: "何须 ", value: "2" },
    { name: "不能 ", value: "2" },
    { name: "相逢 ", value: "2" },
    { name: "家贫 ", value: "2" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //初唐第一位诗人 王绩
var data1 = {
  value: [
    { name: "伊川 ", value: "3" },
    { name: "花柳 ", value: "2" },
    { name: "山河 ", value: "2" },
    { name: "春酒 ", value: "2" },
    { name: "洛阳 ", value: "2" },
    { name: "北斗 ", value: "2" },
    { name: "天子 ", value: "2" },
    { name: "登高 ", value: "2" },
    { name: "城外 ", value: "2" },
    { name: "携手 ", value: "2" },
    { name: "山栖 ", value: "2" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABvCAYAAADixZ5gAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAewgAAHsIBbtB1PgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAqmSURBVHic7Z1/bFXlGcc/zzltxalAe+8F5/DHKj8L/tjQLcCyFGiLDNBl2y2lOkeckc2FbcZomExWExM1MVuiW7JgtrE46cW7xIQZTXsvrP4hM0uW/eFgzJoypzikty1VGFDuOc/+aNEi/Xnved/7o/fz3+153+d5Tr59z3nenwdKlChRokSJQVIb6+7WaLQi13GYwsl1AKY49u2GyxB5OuX2fSfXsZiiaMUrG/C3AhFBthdr6ytK8YZa3QNDP6/tdfvvymlAhihK8dwB7gdmnf+t8IjW1pblMCQjFJ14RzbXThPRBy78q17fM7usOTcRmaPoxJt+uvx+4LMXXRB5tNhaX1GJd2Rz7TQVHhzl8tzU7IqNVgMyTFGJN/10+RbgqtGui+h2bWkpmnsumhvpXLv2EhUeGqfYot7DB6JWArJA0YhXOSN9L/C58cqp6I5iaX1FcRN639JyGLfVDRWmpvfwgW+YjcgORSFe6sOq7wLXTrS8oi3F0PoK/gaGWt3Dk6y2uOfw63eYiMcmBS9e6sPKzQKfn2w9UXYoiImYbFHQ4ul9S8sdZFtGdYWbU5sa1gcdk00KWrze/sq7FKozrS/qtxRy6ytY8TQadVUya3WfIF/sbq5fG0xE9ilY8XqcvjuB+dnacXx2BBBOTihI8TQadXF4JCBzX+7ZWN8QkC2rFKR4Kae/CZUFQdlTkZagbNmk4MTTlhZHRLN8111kdVmqqX51sDbNU3Dipf55oBFYErRdhceCtmmaghJPQQQN6l13AQIrupvqak3YNkVBidfb1PBNhBtM2RfkUVO2TVAw4imIj/7UsJtVxxsbvmrYR2AUjHg9TfVfF7jJtB/HMf4PEhgFIx4E1q8bj/reTXVfseQrKwpCvO6m+tuBW2z589TZbstXNhSEeAJWH2WC3pZqXvMlmz4zIe/F626qWwfcat2x7+V95pn34oH8JEd+16c2rrb/TzMJ8lq8nsa6NQIrchaAuHn97str8XxHcpy26+3dzQ1LcxvD6OTNLPLxaO3luGXzXJW5KswT4QZVmnIdF/APEX3VVzqBTvH8znB8/9FcBwWWxdNotOJ4ed8cN021iCxGtEbFqRbVaoXryPMnwTDOChxV9BDIQUW6xPe7vDK6Zu1OHhFQG0EELp7et7T8+MnKq9001eo41YJWgy4WpEYH11a6QfvMM84gdAEHUbrOC6sV7sHIH9r+G6SjjMTT2tqy41eVXXOBQEI1sBhlPlBUW6kCpA/oQug6L6wr/iHSvFkVT/ZP1tiY4p1oXlfp69nFnjo1HwukVAM1wKUZ3kCJkblAWFQPqesc5OS0tyJ79340UgUB6Nm0epmvssQR5qnPPETmAXOBSywGX2J03kO0U9R521c6xaFTHHd/GYCPUyHwc1Uuz5/8s8Qw5qAyR9GVIiAQqzp6+mUHINKaeM3H+RqiIzbPEvmDwm+qFqy4Uzo60he0s97G+hW+wyvA9BzFVmIMBHmuauHy70lLiz/4+1N0NzcsFV/bgSrr0ZUYi1+HYon7h/chL+oUR3a3/81H6xRSdmMrMRqCPB2OJb7/6c7/qOlJT3R1jbruPtArzYdXYgyeCscSI65THXU4KhTfdwhhJfC+sbBKjMeowsE4Y4nh1vbD6rmrgLwYiJ1KCOwYS7ihMuPT13TbdWm8/ZnsQC0xaVSQB0Ox9l+MV3DCXfLeaN01vuvsB70+u9hKjIGC/Dgca39mIoUnPAVTFU/+R2Al0JlxaCXGQoGtExUOMphVOB6tvdJxy5PA4snWLTEqHnBvOJbYNZlKk578nBXvOJYul1Uob062bokR8VC9Z7LCQRaTsSea11Wm/YF2LC6GLULSqrI5sqf9hUwqZzWH0Le5dqZ3prwNyPsFqnnIANAUjiVeytRA1hNAvdG6Gb7rvAq6LFtbU4izCo2RWGJvNkayXvBTFU/2p8upR/TP2dqaIvxPRDZkKxwEuADp/Q0bPlNx2Zm9QMHt7bbIKeCOcCyxLwhjgc6bDwn4ElCQR2MY5pSi6yOxZEdQBoNf+heNVvS4J+LA7UHbLmD6RfW20J7kG0EaDXyRq8TjAyFvZhTIOIsqMvpwnIaghQNDK5Q/FlA0o/5LEdHtqbMyvLvtryaMG10rptGo21PW/1tU7zbpJ0/5wHG1vuqFpLGRKKN7AyQe90LpGfcg/M6kn/xDjok4q00KB5Y2mihIT1P9s8APbPjLMe/6nrNqVrztbdOOrOzKEdBQLLEVmPB0R4HyjqfeShvCge0tXoMtMAmssunXGiKLwq3th225s7ofbmjp2gybPq3ie1fYdGdVvKFvGSy06dMmggR+GuFYWBWv+63Xrwcus+nTLmJ1dYFV8Ry1e3O2UQPngI6F3T3gavfmrCN21/XYTVhEi7rlAXP6o2usbdCxm7AUe8sDvDKvxpYva+INfbAp6+8g5Due2ss4rYnX1x9aABTlx+aHIxbXs1oTz7OcieWQ4mt5In6xJyuA3e6CvYRlCiQrAALh49FaKxtS7YkndoeOcokjZVbu1Yp470aXXcoU2tsnYmckyYp408qvqKH4D4z7hGIST6bI++48tpIWSzPpUyPT/Bjxl9j4nKkV8XyLow55gcoVJ5pXXWPaja01LFNLPCDtO8bv2bh4vdG6GcAc035G4H1FHxLllRz4tjKrbr7lDfbvbC506gW2nfZOzo3Ekk+H9iTWifjLc7AFzfh73vhxwp7LErFyXDangF+60849Wbmr48TwC6HWfX8BVqUa6+pw5EnAxnH7xlue8RaR2tjwDKJbDboYEHSX56V/NivecWy8wgrSu7H+Wyo8jtkpqjMhb+blEo97phyYf2w6vqn/QB8h7jm6KBRLbpmIcDC0AHhPIh5auGKRKI0KRwzFNy3FR3MN2QZsiBd8N0FBX3ZcvTncmmicvTvZlYkRaWnxQ3sS8bA3c6EiW0AmJP6kfDhpo+89o+J9uKk2DEQCMyiSVEduDceSG4LaxCHx+EAk1r4zXc5cYBvKiXErTdS24YzTaMIyQMWNAX3c4w31nUciL7YZyxivfL79FPBUf3TNc+dc/2Hgh2T5+QHf8Goys4/N7Mc0D4rSGI4llpkUbjgz4m294VhiG543j8GNMWcztSViNuM0uz8v8zHNfyuyJeTNvCm0JxEPNKgJEo7vPxqOJX7kOt4CQXcyeD7Y5FDmd65da+zbFEbF08k/899TZEvo2Ll5kVj7TpNp9kSp3L3/nVAsuUXEuQkhzuTeA2WhmQMLTMVmTDwFQZnoGsYeBkdF5kdi7TuloyNtKq5MCbW2HQy3JhpFdTmwf6L1TC4FNJaw9EXrrkaYOU6xk8CvHE+fyORDSLlg6FSH1UOjNU8wzsF5YnDziTHx0uWyxPFHvTwg6K606I7Zrfs+MBWDScIvJpMK+1KbGtajPC7ojaMUNdbyjD02nZEzzXPA8y7uglAsuaVQhTuPgEZa2/8UXrj8C6I0Clw0YGByOszY2GZqU8Pvhx3hoQh/9IXts3YnivaYY41GK1Ju/2aBx4Z9j8JPl8v0oX5koJjLNnVoR5BIUtW5JdyaaCxm4WDU0RqnbMDM5hMjLU9bWpyefx1oU/TxSGviNRM+CoH+6Jqqc67/sCB/D8Xa9+Q6nhIlSpQoUaJQ+T94aFgc9Z3O7wAAAABJRU5ErkJggg==",
}; //初唐第二位诗人 宋之问
var data2 = {
  value: [
    { name: "酌酒 ", value: "3" },
    { name: "送君 ", value: "3" },
    { name: "一生 ", value: "2" },
    { name: "四邻 ", value: "2" },
    { name: "独坐 ", value: "2" },
    { name: "风烟 ", value: "2" },
    { name: "鸿雁 ", value: "2" },
    { name: "白云 ", value: "2" },
    { name: "尊酒 ", value: "2" },
    { name: "何时 ", value: "2" },
    { name: "浮云 ", value: "2" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //初唐第三位诗人 卢照邻
var data3 = {
  value: [
    { name: "回首", value: "11" },
    { name: "故人", value: "10" },
    { name: "万里", value: "9" },
    { name: "骑马", value: "8" },
    { name: "人生", value: "8" },
    { name: "平生", value: "7" },
    { name: "戎马", value: "7" },
    { name: "杯酒", value: "7" },
    { name: "春风", value: "7" },
    { name: "萧条", value: "7" },
    { name: "少年", value: "7" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //盛唐第一位诗人 杜甫
var data4 = {
  value: [
    { name: "美酒 ", value: "23" },
    { name: "黄金 ", value: "17" },
    { name: "春风 ", value: "16" },
    { name: "不可 ", value: "14" },
    { name: "君不见 ", value: "14" },
    { name: "杯酒 ", value: "12" },
    { name: "少年 ", value: "12" },
    { name: "桃李 ", value: "12" },
    { name: "明月 ", value: "12" },
    { name: "天地 ", value: "12" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABvCAYAAADixZ5gAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAewgAAHsIBbtB1PgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAqmSURBVHic7Z1/bFXlGcc/zzltxalAe+8F5/DHKj8L/tjQLcCyFGiLDNBl2y2lOkeckc2FbcZomExWExM1MVuiW7JgtrE46cW7xIQZTXsvrP4hM0uW/eFgzJoypzikty1VGFDuOc/+aNEi/Xnved/7o/fz3+153+d5Tr59z3nenwdKlChRokSJQVIb6+7WaLQi13GYwsl1AKY49u2GyxB5OuX2fSfXsZiiaMUrG/C3AhFBthdr6ytK8YZa3QNDP6/tdfvvymlAhihK8dwB7gdmnf+t8IjW1pblMCQjFJ14RzbXThPRBy78q17fM7usOTcRmaPoxJt+uvx+4LMXXRB5tNhaX1GJd2Rz7TQVHhzl8tzU7IqNVgMyTFGJN/10+RbgqtGui+h2bWkpmnsumhvpXLv2EhUeGqfYot7DB6JWArJA0YhXOSN9L/C58cqp6I5iaX1FcRN639JyGLfVDRWmpvfwgW+YjcgORSFe6sOq7wLXTrS8oi3F0PoK/gaGWt3Dk6y2uOfw63eYiMcmBS9e6sPKzQKfn2w9UXYoiImYbFHQ4ul9S8sdZFtGdYWbU5sa1gcdk00KWrze/sq7FKozrS/qtxRy6ytY8TQadVUya3WfIF/sbq5fG0xE9ilY8XqcvjuB+dnacXx2BBBOTihI8TQadXF4JCBzX+7ZWN8QkC2rFKR4Kae/CZUFQdlTkZagbNmk4MTTlhZHRLN8111kdVmqqX51sDbNU3Dipf55oBFYErRdhceCtmmaghJPQQQN6l13AQIrupvqak3YNkVBidfb1PBNhBtM2RfkUVO2TVAw4imIj/7UsJtVxxsbvmrYR2AUjHg9TfVfF7jJtB/HMf4PEhgFIx4E1q8bj/reTXVfseQrKwpCvO6m+tuBW2z589TZbstXNhSEeAJWH2WC3pZqXvMlmz4zIe/F626qWwfcat2x7+V95pn34oH8JEd+16c2rrb/TzMJ8lq8nsa6NQIrchaAuHn97str8XxHcpy26+3dzQ1LcxvD6OTNLPLxaO3luGXzXJW5KswT4QZVmnIdF/APEX3VVzqBTvH8znB8/9FcBwWWxdNotOJ4ed8cN021iCxGtEbFqRbVaoXryPMnwTDOChxV9BDIQUW6xPe7vDK6Zu1OHhFQG0EELp7et7T8+MnKq9001eo41YJWgy4WpEYH11a6QfvMM84gdAEHUbrOC6sV7sHIH9r+G6SjjMTT2tqy41eVXXOBQEI1sBhlPlBUW6kCpA/oQug6L6wr/iHSvFkVT/ZP1tiY4p1oXlfp69nFnjo1HwukVAM1wKUZ3kCJkblAWFQPqesc5OS0tyJ79340UgUB6Nm0epmvssQR5qnPPETmAXOBSywGX2J03kO0U9R521c6xaFTHHd/GYCPUyHwc1Uuz5/8s8Qw5qAyR9GVIiAQqzp6+mUHINKaeM3H+RqiIzbPEvmDwm+qFqy4Uzo60he0s97G+hW+wyvA9BzFVmIMBHmuauHy70lLiz/4+1N0NzcsFV/bgSrr0ZUYi1+HYon7h/chL+oUR3a3/81H6xRSdmMrMRqCPB2OJb7/6c7/qOlJT3R1jbruPtArzYdXYgyeCscSI65THXU4KhTfdwhhJfC+sbBKjMeowsE4Y4nh1vbD6rmrgLwYiJ1KCOwYS7ihMuPT13TbdWm8/ZnsQC0xaVSQB0Ox9l+MV3DCXfLeaN01vuvsB70+u9hKjIGC/Dgca39mIoUnPAVTFU/+R2Al0JlxaCXGQoGtExUOMphVOB6tvdJxy5PA4snWLTEqHnBvOJbYNZlKk578nBXvOJYul1Uob062bokR8VC9Z7LCQRaTsSea11Wm/YF2LC6GLULSqrI5sqf9hUwqZzWH0Le5dqZ3prwNyPsFqnnIANAUjiVeytRA1hNAvdG6Gb7rvAq6LFtbU4izCo2RWGJvNkayXvBTFU/2p8upR/TP2dqaIvxPRDZkKxwEuADp/Q0bPlNx2Zm9QMHt7bbIKeCOcCyxLwhjgc6bDwn4ElCQR2MY5pSi6yOxZEdQBoNf+heNVvS4J+LA7UHbLmD6RfW20J7kG0EaDXyRq8TjAyFvZhTIOIsqMvpwnIaghQNDK5Q/FlA0o/5LEdHtqbMyvLvtryaMG10rptGo21PW/1tU7zbpJ0/5wHG1vuqFpLGRKKN7AyQe90LpGfcg/M6kn/xDjok4q00KB5Y2mihIT1P9s8APbPjLMe/6nrNqVrztbdOOrOzKEdBQLLEVmPB0R4HyjqfeShvCge0tXoMtMAmssunXGiKLwq3th225s7ofbmjp2gybPq3ie1fYdGdVvKFvGSy06dMmggR+GuFYWBWv+63Xrwcus+nTLmJ1dYFV8Ry1e3O2UQPngI6F3T3gavfmrCN21/XYTVhEi7rlAXP6o2usbdCxm7AUe8sDvDKvxpYva+INfbAp6+8g5Due2ss4rYnX1x9aABTlx+aHIxbXs1oTz7OcieWQ4mt5In6xJyuA3e6CvYRlCiQrAALh49FaKxtS7YkndoeOcokjZVbu1Yp470aXXcoU2tsnYmckyYp408qvqKH4D4z7hGIST6bI++48tpIWSzPpUyPT/Bjxl9j4nKkV8XyLow55gcoVJ5pXXWPaja01LFNLPCDtO8bv2bh4vdG6GcAc035G4H1FHxLllRz4tjKrbr7lDfbvbC506gW2nfZOzo3Ekk+H9iTWifjLc7AFzfh73vhxwp7LErFyXDangF+60849Wbmr48TwC6HWfX8BVqUa6+pw5EnAxnH7xlue8RaR2tjwDKJbDboYEHSX56V/NivecWy8wgrSu7H+Wyo8jtkpqjMhb+blEo97phyYf2w6vqn/QB8h7jm6KBRLbpmIcDC0AHhPIh5auGKRKI0KRwzFNy3FR3MN2QZsiBd8N0FBX3ZcvTncmmicvTvZlYkRaWnxQ3sS8bA3c6EiW0AmJP6kfDhpo+89o+J9uKk2DEQCMyiSVEduDceSG4LaxCHx+EAk1r4zXc5cYBvKiXErTdS24YzTaMIyQMWNAX3c4w31nUciL7YZyxivfL79FPBUf3TNc+dc/2Hgh2T5+QHf8Goys4/N7Mc0D4rSGI4llpkUbjgz4m294VhiG543j8GNMWcztSViNuM0uz8v8zHNfyuyJeTNvCm0JxEPNKgJEo7vPxqOJX7kOt4CQXcyeD7Y5FDmd65da+zbFEbF08k/899TZEvo2Ll5kVj7TpNp9kSp3L3/nVAsuUXEuQkhzuTeA2WhmQMLTMVmTDwFQZnoGsYeBkdF5kdi7TuloyNtKq5MCbW2HQy3JhpFdTmwf6L1TC4FNJaw9EXrrkaYOU6xk8CvHE+fyORDSLlg6FSH1UOjNU8wzsF5YnDziTHx0uWyxPFHvTwg6K606I7Zrfs+MBWDScIvJpMK+1KbGtajPC7ojaMUNdbyjD02nZEzzXPA8y7uglAsuaVQhTuPgEZa2/8UXrj8C6I0Clw0YGByOszY2GZqU8Pvhx3hoQh/9IXts3YnivaYY41GK1Ju/2aBx4Z9j8JPl8v0oX5koJjLNnVoR5BIUtW5JdyaaCxm4WDU0RqnbMDM5hMjLU9bWpyefx1oU/TxSGviNRM+CoH+6Jqqc67/sCB/D8Xa9+Q6nhIlSpQoUaJQ+T94aFgc9Z3O7wAAAABJRU5ErkJggg==",
}; //盛唐第二位诗人 李白
var data5 = {
  value: [
    { name: "故人", value: "11" },
    { name: "长安", value: "11" },
    { name: "置酒", value: "10" },
    { name: "万里", value: "9" },
    { name: "主人", value: "7" },
    { name: "客舍", value: "7" },
    { name: "夫子", value: "7" },
    { name: "送君", value: "7" },
    { name: "知君", value: "7" },
    { name: "春草", value: "6" },
    { name: "将军", value: "6" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //盛唐第三位诗人 岑参
var data6 = {
  value: [
    { name: "杯酒", value: "41" },
    { name: "不知", value: "36" },
    { name: "何处", value: "34" },
    { name: "一杯", value: "27" },
    { name: "不如", value: "26" },
    { name: "管弦", value: "25" },
    { name: "今日", value: "24" },
    { name: "人间", value: "24" },
    { name: "今朝", value: "22" },
    { name: "平生", value: "22" },
    { name: "一盏", value: "22" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //中唐第一位诗人 白居易
var data7 = {
  value: [
    { name: "何处", value: "9" },
    { name: "杯酒", value: "6" },
    { name: "从此", value: "5" },
    { name: "深春好", value: "5" },
    { name: "今朝", value: "5" },
    { name: "少年", value: "5" },
    { name: "次第", value: "4" },
    { name: "春深", value: "4" },
    { name: "今日", value: "4" },
    { name: "唯有", value: "4" },
    { name: "故人", value: "4" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //中唐第二位诗人 刘禹锡
var data8 = {
  value: [
    { name: "皇帝", value: "14" },
    { name: "不可", value: "13" },
    { name: "先生", value: "10" },
    { name: "不能", value: "9" },
    { name: "不敢", value: "9" },
    { name: "名声", value: "7" },
    { name: "文章", value: "6" },
    { name: "左右", value: "6" },
    { name: "太平", value: "5" },
    { name: "感激", value: "5" },
    { name: "如此", value: "5" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //中唐第三位诗人 韩愈
var data9 = {
  value: [
    { name: "处士", value: "7" },
    { name: "何处", value: "7" },
    { name: "芳草", value: "6" },
    { name: "千里", value: "5" },
    { name: "人生", value: "5" },
    { name: "平生", value: "5" },
    { name: "天子", value: "5" },
    { name: "何为", value: "5" },
    { name: "太守", value: "4" },
    { name: "把酒", value: "4" },
    { name: "东流", value: "4" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //晚唐第一位诗人 杜牧
var data10 = {
  value: [
    { name: "黄昏", value: "4" },
    { name: "不见", value: "4" },
    { name: "风流", value: "3" },
    { name: "不知", value: "3" },
    { name: "平明", value: "3" },
    { name: "平生", value: "3" },
    { name: "寂寞", value: "3" },
    { name: "何处", value: "3" },
    { name: "无人", value: "3" },
    { name: "未知", value: "3" },
    { name: "巴西", value: "3" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //晚唐第二位诗人 李商隐
var data11 = {
  value: [
    { name: "千里", value: "3" },
    { name: "门前", value: "2" },
    { name: "秋风", value: "2" },
    { name: "一曲", value: "2" },
    { name: "故乡", value: "2" },
    { name: "回首", value: "2" },
    { name: "一双", value: "2" },
    { name: "春水", value: "2" },
    { name: "送君", value: "1" },
    { name: "楚国", value: "1" },
    { name: "江浦", value: "1" },
  ],
  //小鸟图片
  image:
    "data:image/png;base64,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",
}; //晚唐第三位诗人 温庭筠
const initWordChat = () => {
  //echart图表

  const mChart: HTMLElement = document.getElementById("main") as HTMLElement;
  mChart.removeAttribute("_echarts_instance_");
  const myChart = echarts.init(mChart);
  const mChart1: HTMLElement = document.getElementById("main1") as HTMLElement;
  mChart1.removeAttribute("_echarts_instance_");
  const myChart1 = echarts.init(mChart1);
  const mChart2: HTMLElement = document.getElementById("main2") as HTMLElement;
  mChart2.removeAttribute("_echarts_instance_");
  const myChart2 = echarts.init(mChart2);
  const mChart3: HTMLElement = document.getElementById("main3") as HTMLElement;
  mChart3.removeAttribute("_echarts_instance_");
  const myChart3 = echarts.init(mChart3);
  const mChart4: HTMLElement = document.getElementById("main4") as HTMLElement;
  mChart4.removeAttribute("_echarts_instance_");
  const myChart4 = echarts.init(mChart4);
  const mChart5: HTMLElement = document.getElementById("main5") as HTMLElement;
  mChart5.removeAttribute("_echarts_instance_");
  const myChart5 = echarts.init(mChart5);
  const mChart6: HTMLElement = document.getElementById("main6") as HTMLElement;
  mChart6.removeAttribute("_echarts_instance_");
  const myChart6 = echarts.init(mChart6);
  const mChart7: HTMLElement = document.getElementById("main7") as HTMLElement;
  mChart7.removeAttribute("_echarts_instance_");
  const myChart7 = echarts.init(mChart7);
  const mChart8: HTMLElement = document.getElementById("main8") as HTMLElement;
  mChart8.removeAttribute("_echarts_instance_");
  const myChart8 = echarts.init(mChart8);
  const mChart9: HTMLElement = document.getElementById("main9") as HTMLElement;
  mChart9.removeAttribute("_echarts_instance_");
  const myChart9 = echarts.init(mChart9);
  const mChart10: HTMLElement = document.getElementById(
    "main10"
  ) as HTMLElement;
  mChart10.removeAttribute("_echarts_instance_");
  const myChart10 = echarts.init(mChart10);
  const mChart11: HTMLElement = document.getElementById(
    "main11"
  ) as HTMLElement;
  mChart11.removeAttribute("_echarts_instance_");
  const myChart11 = echarts.init(mChart11);

  // var myChart = echarts.init(document.getElementById("main"));
  // var myChart1 = echarts.init(document.getElementById("main1"));
  // var myChart2 = echarts.init(document.getElementById("main2"));
  // var myChart3 = echarts.init(document.getElementById("main3"));
  // var myChart4 = echarts.init(document.getElementById("main4"));
  // var myChart5 = echarts.init(document.getElementById("main5"));
  // var myChart6 = echarts.init(document.getElementById("main6"));
  // var myChart7 = echarts.init(document.getElementById("main7"));
  // var myChart8 = echarts.init(document.getElementById("main8"));
  // var myChart9 = echarts.init(document.getElementById("main9"));
  // var myChart10 = echarts.init(document.getElementById("main10"));
  // var myChart11 = echarts.init(document.getElementById("main11"));
  //温馨提示：image 选取有严格要求不可过大；，否则firefox不兼容  iconfont上面的图标可以
  var maskImage = new Image();
  var maskImage1 = new Image();
  var maskImage2 = new Image();
  var maskImage3 = new Image();
  var maskImage4 = new Image();
  var maskImage5 = new Image();
  var maskImage6 = new Image();
  var maskImage7 = new Image();
  var maskImage8 = new Image();
  var maskImage9 = new Image();
  var maskImage10 = new Image();
  var maskImage11 = new Image();
  maskImage.src = data.image;
  maskImage1.src = data.image;
  maskImage2.src = data.image;
  maskImage3.src = data.image;
  maskImage4.src = data.image;
  maskImage5.src = data.image;
  maskImage6.src = data.image;
  maskImage7.src = data.image;
  maskImage8.src = data.image;
  maskImage9.src = data.image;
  maskImage10.src = data.image;
  maskImage11.src = data.image;

  myChart.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    legend: {
      // layout: 'vertical',
      itemGap: 15,
      orient: "vertical",
      left: "1%",
      top: "3%",
      data: ["哀", "思", "喜"],
    },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage: maskImage,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 2,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 2,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 32,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //初唐第一位诗人 王绩
  myChart1.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1) * 0.5,
        sizeRange: [nowSize(6), nowSize(20)],
        rotationRange: [0, 0, 0, 0],
        maskImage1: maskImage1,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data1.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 0,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 1,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 15,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //初唐第二位诗人 宋之问
  myChart2.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage2: maskImage2,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data2.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 0,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 1,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 10,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  // 初唐第三位诗人 卢照邻
  myChart3.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage3: maskImage3,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data3.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 7,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 20,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 150,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //盛唐第一位诗人 杜甫
  myChart4.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage4: maskImage4,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data4.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",

        // top:200,

        data: [
          {
            value: 4,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 10,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 158,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //盛唐第二位诗人 李白
  myChart5.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },

    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage5: maskImage5,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data5.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 3,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 11,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 84,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //盛唐第三位诗人 岑参
  myChart6.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage6: maskImage6,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data6.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 40,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 80,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 527,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //中唐第一位诗人 白居易
  myChart7.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage7: maskImage7,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data7.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 5,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 10,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 80,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //中唐第二位诗人 刘禹锡
  myChart8.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage8: maskImage8,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data8.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 2,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 3,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 57,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });

  //中唐第三位诗人 韩愈
  myChart9.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },

    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage9: maskImage9,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data9.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 2,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 4,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 66,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //晚唐第一位诗人 杜牧
  myChart10.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage10: maskImage10,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data10.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 0,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 6,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 54,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
  //晚唐第二位诗人 李商隐
  myChart11.setOption({
    // backgroundColor: "#fffafa",
    tooltip: {
      show: false,
    },
    //         legend: {
    //     itemGap:12,
    //   right:'18%',
    //     top: '85%',
    //     data:['哀','思','喜',]
    // },
    series: [
      {
        type: "wordCloud",
        gridSize: nowSize(1),
        sizeRange: [nowSize(12), nowSize(35)],
        rotationRange: [0, 0, 0, 0],
        maskImage11: maskImage11,
        textStyle: {
          color: "rgb(207,179,85)",
          normal: {
            color: "rgb(207,179,85)",
          },
        },
        left: "center",
        top: "center",
        // width: '96%',
        // height: '100%',
        right: null,
        bottom: null,
        // width: 300,
        // height: 200,
        // top: 20,
        data: data11.value,
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: true,
        radius: [nowSize(120), nowSize(140)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(214,169,145)",
        // top:200,

        data: [
          {
            value: 0,
            name: "喜",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: true,
        radius: [nowSize(100), nowSize(120)],
        itemStyle: dataStyle,
        hoverAnimation: false,
        color: "rgb(178,195,181)",

        data: [
          {
            value: 3,
            name: "思",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        radius: [nowSize(80), nowSize(100)],
        itemStyle: dataStyle,
        color: "rgb(176,177,181)",

        data: [
          {
            value: 16,
            name: "哀",
          },
          {
            value: 100,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  });
};
//晚唐第三位诗人 温庭筠
</script>

<style lang="less" scoped>
.wordCloud {
  .title {
    padding-top: 2vw;
    .titleImg {
      height: 3vw;
      width: 100vw;
      margin: 2vw 0 0 -2vw;
    }
  }
  #all {
    background-color: #f6f3e5;
    margin: 5vw 0 0 15vw;
    width: 70vw;
    height: 160vh;
    border-radius: 20px;
    .container {
      margin: 0 0 0 3vw;
      padding-top: 2vw;

      .items {
        margin-left: 2vw;
        .main {
          width: 15vw;
          height: 30vh;
        }
        .name {
          text-align: center;
          margin: 0 0 2vw 0;
          font-size: 1rem;
        }
      }
      .name1 {
        margin: 12vh 0 0 2vw;
        font-size: 1rem;
      }
    }
  }

  .textInfo {
    position: absolute;
    display: inline-block;
    width: 22vw;
    height: 80vh;
    // background-color: #f6f3e5;
    margin: 2vw 0 0 20vw;
    .imgInfo {
      width: 280%;
    }
  }
}
</style>
