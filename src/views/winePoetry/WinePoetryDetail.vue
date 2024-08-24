<template>
  <div class="detail">
    <div class="back-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="content">
      <h1>{{ poetry.title }}</h1>
      <h3>{{ poetry.author }}</h3>
      <p class="poetry-content">{{ poetry.content }}</p> <!-- 添加类名 -->
      <div class="additional-info">
        <p><strong>作诗地点：</strong>{{ poetry.location }}</p>
        <p><strong>涉及人物：</strong></p>
        <ul>
          <li v-for="person in poetry.characters" :key="person.name">
            <strong>{{ person.name }}：</strong>{{ person.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const poetryId = ref<number>(parseInt(route.params.winePoetryDetailId as string, 10));

const poetry = ref({
  title: '',
  author: '',
  content: '',
  location: '',
  characters: [] as { name: string; description: string }[],
});

const fetchPoetryDetail = async () => {
  // 模拟获取诗词详细数据
  const data = [
    {
      id: 1,
      title: '赠崔秋浦三首 其一',
      author: '盛唐 李白',
      content: `  吾爱崔秋浦，宛然陶令风。
  门前五杨柳，井上二梧桐。
  山鸟下厅事，檐花落酒中。
  怀君未忍去，惆怅意无穷。`,
      location: '安徽省池州市',
      characters: [
        {
          name: '李白',
          description: '盛唐 701年1月16日 — 762。唐陇西成纪人，其先人隋末流寓西域，故生于安西都护府所属碎叶城。中宗神龙初，迁居蜀之绵州昌隆县青莲乡，又尝寓居山东，故亦称山东人。字太白，号青莲居士。少有逸才，志气宏放，飘然有超世之心。十岁通诗书，被称为“天才英特”。喜纵横术，击剑任侠，轻财重施。青年时离蜀漫游，玄宗天宝初，入长安，经贺知章、吴筠推荐，诏供奉翰林。但政治上不受重视，又受权贵谗毁，仅一年余即离开长安。天宝三载在洛阳结识杜甫。二人于诗坛齐名，并称“李杜”。安史乱起，白为永王李璘府僚，参与平乱。因永王兵败，坐流夜郎，中途遇赦东还，依族人当涂令李阳冰。不久病卒。其诗风雄奇豪放、清新飘逸',
        },
        {
          name: '崔秋浦',
          description: '李白在池州结交的官员。',
        },
      ],
    },
    {
      id: 2,
      title: '赠郭将军',
      author: '盛唐 李白',
      content: `将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。 
      平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。
                畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。`,
      location: '安徽省池州市',
      characters: [
        {
          name: '李白',
          description: '盛唐 701年1月16日 — 762。唐陇西成纪人，其先人隋末流寓西域，故生于安西都护府所属碎叶城。中宗神龙初，迁居蜀之绵州昌隆县青莲乡，又尝寓居山东，故亦称山东人。字太白，号青莲居士。少有逸才，志气宏放，飘然有超世之心。十岁通诗书，被称为“天才英特”。喜纵横术，击剑任侠，轻财重施。青年时离蜀漫游，玄宗天宝初，入长安，经贺知章、吴筠推荐，诏供奉翰林。但政治上不受重视，又受权贵谗毁，仅一年余即离开长安。天宝三载在洛阳结识杜甫。二人于诗坛齐名，并称“李杜”。安史乱起，白为永王李璘府僚，参与平乱。因永王兵败，坐流夜郎，中途遇赦东还，依族人当涂令李阳冰。不久病卒。其诗风雄奇豪放、清新飘逸',
        },
        {
          name: '郭将军',
          description: '李白赠诗的对象，一位年轻的将军。',
        },
      ],
    },
    {
      id: 3,
      title: '陪侍郎叔游洞庭醉后三首 其二',
      author: '盛唐 李白',
      content: `船上齐桡乐，湖心泛月归。
白鸥闲不去，争拂酒筵飞。`,
      location: '洞庭湖',
      characters: [
        {
          name: '侍郎叔',
          description: '李白在洞庭湖游玩的陪同者。',
        },
      ],
    },
    {
      id: 4,
      title: '赠崔秋浦三首 其一',
      author: '盛唐 李白',
      content: `  吾爱崔秋浦，宛然陶令风。
  门前五杨柳，井上二梧桐。
  山鸟下厅事，檐花落酒中。
  怀君未忍去，惆怅意无穷。`,
      location: '安徽省池州市',
      characters: [
        {
          name: '李白',
          description: '盛唐 701年1月16日 — 762。唐陇西成纪人，其先人隋末流寓西域，故生于安西都护府所属碎叶城。中宗神龙初，迁居蜀之绵州昌隆县青莲乡，又尝寓居山东，故亦称山东人。字太白，号青莲居士。少有逸才，志气宏放，飘然有超世之心。十岁通诗书，被称为“天才英特”。喜纵横术，击剑任侠，轻财重施。青年时离蜀漫游，玄宗天宝初，入长安，经贺知章、吴筠推荐，诏供奉翰林。但政治上不受重视，又受权贵谗毁，仅一年余即离开长安。天宝三载在洛阳结识杜甫。二人于诗坛齐名，并称“李杜”。安史乱起，白为永王李璘府僚，参与平乱。因永王兵败，坐流夜郎，中途遇赦东还，依族人当涂令李阳冰。不久病卒。其诗风雄奇豪放、清新飘逸',
        },
        {
          name: '崔秋浦',
          description: '李白在池州结交的官员。',
        },
      ],
    },
    {
      id: 5,
      title: '赠郭将军',
      author: '盛唐 李白',
      content: `将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。 
      平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。
                畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。`,
      location: '安徽省池州市',
      characters: [
        {
          name: '李白',
          description: '盛唐 701年1月16日 — 762。唐陇西成纪人，其先人隋末流寓西域，故生于安西都护府所属碎叶城。中宗神龙初，迁居蜀之绵州昌隆县青莲乡，又尝寓居山东，故亦称山东人。字太白，号青莲居士。少有逸才，志气宏放，飘然有超世之心。十岁通诗书，被称为“天才英特”。喜纵横术，击剑任侠，轻财重施。青年时离蜀漫游，玄宗天宝初，入长安，经贺知章、吴筠推荐，诏供奉翰林。但政治上不受重视，又受权贵谗毁，仅一年余即离开长安。天宝三载在洛阳结识杜甫。二人于诗坛齐名，并称“李杜”。安史乱起，白为永王李璘府僚，参与平乱。因永王兵败，坐流夜郎，中途遇赦东还，依族人当涂令李阳冰。不久病卒。其诗风雄奇豪放、清新飘逸',
        },
        {
          name: '郭将军',
          description: '李白赠诗的对象，一位年轻的将军。',
        },
      ],
    },
    {
      id: 6,
      title: '陪侍郎叔游洞庭醉后三首 其二',
      author: '盛唐 李白',
      content: `船上齐桡乐，湖心泛月归。
白鸥闲不去，争拂酒筵飞。`,
      location: '洞庭湖',
      characters: [
        {
          name: '侍郎叔',
          description: '李白在洞庭湖游玩的陪同者。',
        },
      ],
    },
  ];

  // 根据诗词 ID 找到对应的诗词
  const poemData = data.find(p => p.id === poetryId.value);
  poetry.value = poemData || {
    title: '未找到诗词',
    author: '',
    content: '该诗词不存在。',
    location: '',
    characters: [],
  };
};

onMounted(() => {
  fetchPoetryDetail();
});

const goBack = () => {
  router.push('/WinePoetry'); // 返回首页或上一个页面
};
</script>

<style lang="less" scoped>
.detail {
  padding: 2vw;
  background: #f6f3e5;
  border-radius: 1vw;
  .back-button {
    margin-bottom: 2vw;
  }
  .content {
    font-family: Source Han Sans;
    text-align: center;
    h1 {
      font-family: Source Han Sans;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      font-size: 2rem;
      color:  #3D3D3D;
      margin-bottom: 1vw;
    }
    h3 {
      font-size: 1.5rem;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #908D8D;
      margin-bottom: 1vw;
    }
    p {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #908D8D;
      white-space: pre-wrap;
      margin-bottom: 2vw;
    }
  }
  .additional-info {
    text-align: left;
    font-size: 1rem;
    color: #444;
    margin-top: 2vw;
    p {
      margin: 0.5vw 0;
      color:#3D3D3D;
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        margin: 0.5vw 0;
        text-indent: 2em; /* 每段首行缩进两个字符 */
      }
    }
  }
}
</style>
