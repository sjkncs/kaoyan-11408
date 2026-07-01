import { useState, useMemo } from "react";

// ============================================================
// DATA: Knowledge Map, Problem Types, Study Plan
// ============================================================

const MATH_CHAPTERS = [
  { id: "m0", module: "前置基础", title: "常用代数恒等式与预备知识", status: "done", formulas: 96, keyTopics: ["代数恒等式","三角函数","指数对数","不等式"] },
  { id: "m1", module: "高等数学", title: "Ch1 函数与极限", status: "done", formulas: 28, keyTopics: ["极限定义","等价无穷小","夹逼准则","单调有界"] },
  { id: "m2", module: "高等数学", title: "Ch2 导数与微分", status: "done", formulas: 22, keyTopics: ["导数定义","链式法则","隐函数求导","参数方程"] },
  { id: "m3", module: "高等数学", title: "Ch3 微分中值定理与导数应用", status: "done", formulas: 18, keyTopics: ["罗尔定理","拉格朗日","洛必达","泰勒展开"] },
  { id: "m4", module: "高等数学", title: "Ch4 不定积分", status: "todo", formulas: 20, keyTopics: ["换元法","分部积分","有理函数","三角换元"] },
  { id: "m5", module: "高等数学", title: "Ch5 定积分", status: "todo", formulas: 18, keyTopics: ["牛顿-莱布尼茨","换元积分","反常积分","华里士公式"] },
  { id: "m6", module: "高等数学", title: "Ch6 定积分应用", status: "todo", formulas: 12, keyTopics: ["面积","旋转体体积","弧长","物理应用"] },
  { id: "m7", module: "高等数学", title: "Ch7 微分方程", status: "todo", formulas: 16, keyTopics: ["可分离变量","一阶线性","伯努利","二阶常系数"] },
  { id: "m8", module: "高等数学", title: "Ch8 向量代数与空间解析几何", status: "todo", formulas: 14, keyTopics: ["点积叉积","平面方程","直线方程","曲面方程"] },
  { id: "m9", module: "高等数学", title: "Ch9 多元函数微分法", status: "todo", formulas: 20, keyTopics: ["偏导数","全微分","链式法则","极值/条件极值"] },
  { id: "m10", module: "高等数学", title: "Ch10 重积分", status: "todo", formulas: 15, keyTopics: ["二重积分","三重积分","极坐标","柱/球坐标"] },
  { id: "m11", module: "高等数学", title: "Ch11 曲线积分与曲面积分", status: "todo", formulas: 22, keyTopics: ["第一/二类曲线积分","格林公式","高斯公式","斯托克斯"] },
  { id: "m12", module: "高等数学", title: "Ch12 无穷级数", status: "todo", formulas: 24, keyTopics: ["收敛判别","幂级数","傅里叶级数","展开求和"] },
  { id: "m13", module: "线性代数", title: "Ch1 行列式", status: "done", formulas: 10, keyTopics: ["性质","展开定理","克拉默法则"] },
  { id: "m14", module: "线性代数", title: "Ch2 矩阵及其运算", status: "done", formulas: 12, keyTopics: ["矩阵乘法","逆矩阵","伴随矩阵","分块矩阵"] },
  { id: "m15", module: "线性代数", title: "Ch3 初等变换与线性方程组", status: "done", formulas: 8, keyTopics: ["初等变换","秩","解的结构","基础解系"] },
  { id: "m16", module: "线性代数", title: "Ch4 向量组线性相关性", status: "done", formulas: 6, keyTopics: ["线性相关/无关","极大无关组","秩"] },
  { id: "m17", module: "线性代数", title: "Ch5 相似矩阵及二次型", status: "todo", formulas: 10, keyTopics: ["特征值","对角化","正交变换","正定矩阵"] },
  { id: "m18", module: "线性代数", title: "Ch6 线性空间与线性变换", status: "todo", formulas: 4, keyTopics: ["基与维数","坐标变换","线性变换"] },
  { id: "m19", module: "概率论", title: "Ch1 随机事件与概率", status: "todo", formulas: 12, keyTopics: ["古典概型","条件概率","全概率","贝叶斯"] },
  { id: "m20", module: "概率论", title: "Ch2 随机变量及其分布", status: "todo", formulas: 10, keyTopics: ["离散/连续分布","常见分布","分布函数"] },
  { id: "m21", module: "概率论", title: "Ch3 多维随机变量", status: "todo", formulas: 8, keyTopics: ["联合分布","边缘分布","独立性","条件分布"] },
  { id: "m22", module: "概率论", title: "Ch4 数字特征", status: "todo", formulas: 10, keyTopics: ["期望","方差","协方差","相关系数"] },
  { id: "m23", module: "概率论", title: "Ch5 大数定律与中心极限定理", status: "todo", formulas: 4, keyTopics: ["切比雪夫","大数定律","中心极限"] },
  { id: "m24", module: "概率论", title: "Ch6 数理统计基本概念", status: "todo", formulas: 6, keyTopics: ["抽样分布","三大分布","统计量"] },
  { id: "m25", module: "概率论", title: "Ch7 参数估计", status: "todo", formulas: 8, keyTopics: ["矩估计","最大似然","置信区间"] },
  { id: "m26", module: "概率论", title: "Ch8 假设检验", status: "todo", formulas: 8, keyTopics: ["显著性水平","U/T/F检验","两类错误"] },
];

const CS408_CHAPTERS = [
  { id: "c1", subject: "数据结构", title: "Ch1 绪论", status: "done", score: 5, keyTopics: ["时间复杂度","空间复杂度","算法分析"] },
  { id: "c2", subject: "数据结构", title: "Ch2 线性表", status: "done", score: 12, keyTopics: ["顺序表","链表","双向链表","循环链表"] },
  { id: "c3", subject: "数据结构", title: "Ch3 栈、队列和数组", status: "done", score: 10, keyTopics: ["栈的应用","队列","循环队列","双端队列"] },
  { id: "c4", subject: "数据结构", title: "Ch4 串", status: "done", score: 5, keyTopics: ["KMP算法","串的模式匹配"] },
  { id: "c5", subject: "数据结构", title: "Ch5 树与二叉树", status: "done", score: 15, keyTopics: ["二叉树遍历","线索","哈夫曼树","并查集"] },
  { id: "c6", subject: "数据结构", title: "Ch6 图", status: "inprogress", score: 15, keyTopics: ["BFS/DFS","最小生成树","最短路径","拓扑排序"] },
  { id: "c7", subject: "数据结构", title: "Ch7 查找", status: "todo", score: 12, keyTopics: ["B/B+树","散列表","红黑树","AVL"] },
  { id: "c8", subject: "数据结构", title: "Ch8 排序", status: "todo", score: 12, keyTopics: ["快速排序","归并排序","堆排序","各排序比较"] },
  { id: "c9", subject: "计算机组成原理", title: "Ch1 计算机系统概述", status: "todo", score: 5, keyTopics: ["冯诺依曼","性能指标","总线"] },
  { id: "c10", subject: "计算机组成原理", title: "Ch2 数据的表示和运算", status: "todo", score: 10, keyTopics: ["原/反/补码","浮点数","IEEE754","溢出"] },
  { id: "c11", subject: "计算机组成原理", title: "Ch3 存储系统", status: "todo", score: 12, keyTopics: ["Cache","主存","虚拟存储","页面置换"] },
  { id: "c12", subject: "计算机组成原理", title: "Ch4 指令系统", status: "todo", score: 8, keyTopics: ["指令格式","寻址方式","CISC/RISC"] },
  { id: "c13", subject: "计算机组成原理", title: "Ch5 中央处理器", status: "todo", score: 15, keyTopics: ["数据通路","控制器","流水线","冒险"] },
  { id: "c14", subject: "计算机组成原理", title: "Ch6 总线", status: "todo", score: 4, keyTopics: ["总线仲裁","总线定时","总线标准"] },
  { id: "c15", subject: "计算机组成原理", title: "Ch7 输入/输出系统", status: "todo", score: 8, keyTopics: ["I/O接口","中断","DMA"] },
  { id: "c16", subject: "操作系统", title: "Ch1 操作系统概述", status: "todo", score: 5, keyTopics: ["并发","虚拟","系统调用","内核态/用户态"] },
  { id: "c17", subject: "操作系统", title: "Ch2 进程管理", status: "todo", score: 15, keyTopics: ["进程状态","PCB","调度算法","同步互斥"] },
  { id: "c18", subject: "操作系统", title: "Ch3 内存管理", status: "todo", score: 12, keyTopics: ["分页","分段","页面置换","虚拟内存"] },
  { id: "c19", subject: "操作系统", title: "Ch4 文件管理", status: "todo", score: 8, keyTopics: ["索引结构","目录","磁盘调度","空闲空间"] },
  { id: "c20", subject: "操作系统", title: "Ch5 I/O管理", status: "todo", score: 5, keyTopics: ["缓冲","SPOOLing","设备分配"] },
  { id: "c21", subject: "计算机网络", title: "Ch1 概述", status: "done", score: 3, keyTopics: ["OSI","TCP/IP","性能指标"] },
  { id: "c22", subject: "计算机网络", title: "Ch2 物理层", status: "done", score: 3, keyTopics: ["奈奎斯特","香农","编码调制"] },
  { id: "c23", subject: "计算机网络", title: "Ch3 数据链路层", status: "done", score: 8, keyTopics: ["CSMA/CD","CSMA/CA","滑动窗口","HDLC"] },
  { id: "c24", subject: "计算机网络", title: "Ch4 网络层", status: "inprogress", score: 10, keyTopics: ["IP地址","子网划分","路由算法","ICMP/ARP"] },
  { id: "c25", subject: "计算机网络", title: "Ch5 传输层", status: "todo", score: 6, keyTopics: ["TCP三次握手","拥塞控制","流量控制"] },
  { id: "c26", subject: "计算机网络", title: "Ch6 应用层", status: "todo", score: 5, keyTopics: ["DNS","HTTP","SMTP","FTP"] },
];

const PROBLEM_TYPES = {
  "数据结构": [
    { type: "链表操作", difficulty: "基础", approach: "画图→定义指针→边界处理", examples: "反转链表、合并有序链表、判断环", tips: "先画3个节点的图，标清prev/next，再写代码" },
    { type: "树的遍历", difficulty: "核心", approach: "递归三步：终止条件→处理当前→递归子树", examples: "前中后序、层序、路径和、LCA", tips: "写递归先想base case，再想每层做什么" },
    { type: "图的遍历与最短路", difficulty: "核心", approach: "BFS用队列/DFS用栈→Dijkstra模板", examples: "连通分量、拓扑排序、最短路径", tips: "Dijkstra：初始化dist→选最小→松弛邻居→重复" },
    { type: "排序算法分析", difficulty: "易混", approach: "对比表：时间/空间/稳定性/适用场景", examples: "快排vs归并、堆排vs选择、计数排序", tips: "O(nlogn)排序只有三种：快排/归并/堆排" },
    { type: "查找结构", difficulty: "核心", approach: "B树阶数规则→哈希冲突处理→AVL旋转", examples: "B树插入删除、哈希探测、AVL四种旋转", tips: "B树的阶数m：每个节点最多m-1个key" },
  ],
  "计算机组成原理": [
    { type: "数据表示与运算", difficulty: "核心", approach: "补码规则→IEEE754拆解→溢出判断", examples: "浮点数加减、溢出检测、定点数运算", tips: "IEEE754：符号1位+阶码偏置+尾数隐藏1" },
    { type: "Cache映射与替换", difficulty: "高频", approach: "地址拆分：标记+组号+块内→命中/缺失", examples: "直接/组相联/全相联、LRU、命中率", tips: "组相联：主存地址=Tag+Index+Offset" },
    { type: "流水线与冒险", difficulty: "难点", approach: "画时空图→标冒险→插入stall/前递", examples: "数据冒险、控制冒险、分支预测", tips: "冒险三类：结构(资源)/数据(RAW/WAR/WAW)/控制(分支)" },
    { type: "中断与DMA", difficulty: "易混", approach: "中断处理流程 vs DMA传输流程对比", examples: "中断响应时间、DMA周期窃取", tips: "DMA不经过CPU，直接内存↔外设" },
  ],
  "操作系统": [
    { type: "进程同步与互斥", difficulty: "核心", approach: "PV操作模板：P(信号量)→临界区→V(信号量)", examples: "生产者消费者、读者写者、哲学家就餐", tips: "互斥信号量初值=1，同步信号量初值=0或资源数" },
    { type: "死锁分析", difficulty: "高频", approach: "银行家算法步骤→安全序列→资源分配图", examples: "银行家算法、死锁检测与解除", tips: "银行家：Need=Max-Allocation，找Available>=Need的进程" },
    { type: "内存管理计算", difficulty: "难点", approach: "页表项结构→地址转换→缺页中断", examples: "分页地址转换、TLB命中率、页面置换", tips: "逻辑地址=页号+页内偏移，物理地址=物理块号+偏移" },
    { type: "磁盘调度", difficulty: "基础", approach: "FCFS/SSTF/SCAN/C-SCAN 画图模拟", examples: "磁头移动距离计算", tips: "SCAN：到头再反向；C-SCAN：到头后跳回起点" },
  ],
  "计算机网络": [
    { type: "子网划分与CIDR", difficulty: "核心", approach: "IP→二进制→掩码→网络号/广播地址/主机范围", examples: "子网划分、VLSM、路由聚合", tips: "主机数=2^(主机位数)-2，子网数=2^(借用位数)" },
    { type: "TCP/IP协议分析", difficulty: "核心", approach: "画时序图→标序号/窗口/状态", examples: "三次握手、滑动窗口、拥塞控制", tips: "TCP拥塞控制：慢开始→拥塞避免→快重传→快恢复" },
    { type: "路由算法", difficulty: "高频", approach: "Dijkstra/距离向量→填表→迭代", examples: "RIP、OSPF、BGP选路", tips: "RIP跳数≤15，OSPF用Dijkstra，BGP用路径属性" },
    { type: "协议层次综合题", difficulty: "易错", approach: "逐层封装/解封装→标每层PDU和首部", examples: "ARP+IP+TCP+HTTP综合", tips: "数据链路层帧、网络层分组、传输层报文段" },
  ],
  "高等数学": [
    { type: "极限计算", difficulty: "基础", approach: "等价无穷小→洛必达→泰勒展开（按优先级选）", examples: "0/0型、∞-∞型、1^∞型", tips: "先等价替换简化，不行再洛必达，复杂函数用泰勒" },
    { type: "中值定理证明", difficulty: "难点", approach: "构造辅助函数→验证条件→套定理", examples: "罗尔定理、拉格朗日、柯西、积分中值", tips: "辅助函数法：从结论反推F(x)，如f'(ξ)=0→F'(x)=f(x)" },
    { type: "积分计算", difficulty: "核心", approach: "识别类型→选方法（换元/分部/特殊技巧）", examples: "三角换元、有理函数、区间再现", tips: "看到√(a²-x²)用sin替换，√(x²+a²)用tan替换" },
    { type: "级数敛散性", difficulty: "易混", approach: "正项→比较/比值/根值→交错→莱布尼茨→一般→绝对", examples: "p级数、比值判别、Dirichlet", tips: "比值判别：lim|a_{n+1}/a_n|，<1收敛>1发散=1失效" },
  ],
};

const SPACED_REP_DAYS = [1, 3, 7, 14, 30];

const REPOS = [
  { name: "kaoyan-math-bank", desc: "LaTeX数学题库（可预览/排序/导出PDF）", url: "https://github.com/sjkncs/kaoyan-math-bank", icon: "📐" },
  { name: "kaoyan-matth1", desc: "Claude总结的数学一笔记（高数Ch1-3+）", url: "https://github.com/sjkncs/kaoyan-matth1", icon: "📝" },
  { name: "Codex-for-learning-math", desc: "交互式数学一公式手册（465张公式卡）", url: "https://github.com/sjkncs/Codex-for-learning-math", icon: "📖" },
  { name: "408-computer-network-notes", desc: "计网408笔记（谢希仁教材+王道B站课）", url: "https://github.com/sjkncs/408-computer-network-notes", icon: "🌐" },
  { name: "408", desc: "王道408数据结构课后代码题（C++）", url: "https://github.com/sjkncs/408", icon: "💻" },
];

const STUDY_STATS = {
  total: 898, todayMinutes: 597,
  subjects: [
    { name: "高数", hours: 75.5, pct: 27.9, color: "#e74c3c" },
    { name: "线代", hours: 63.7, pct: 23.6, color: "#1abc9c" },
    { name: "数据结构", hours: 57.5, pct: 21.3, color: "#3498db" },
    { name: "计算机网络", hours: 35.0, pct: 12.9, color: "#2ecc71" },
    { name: "英语", hours: 23.9, pct: 8.8, color: "#f39c12" },
    { name: "计组", hours: 14.5, pct: 5.4, color: "#9b59b6" },
  ]
};

// ============================================================
// COMPONENTS
// ============================================================

const tabs = ["仪表盘", "知识图谱", "题型攻略", "错题本", "复习计划", "工具箱"];

function StatusBadge({ status }) {
  const map = { done: { bg: "#d4edda", text: "#155724", label: "已完成" }, inprogress: { bg: "#fff3cd", text: "#856404", label: "进行中" }, todo: { bg: "#f8d7da", text: "#721c24", label: "未开始" } };
  const s = map[status] || map.todo;
  return <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{s.label}</span>;
}

function ProgressBar({ value, max, color = "#3498db" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ background: "#e9ecef", borderRadius: 6, height: 8, width: "100%", overflow: "hidden" }}>
      <div style={{ background: color, height: "100%", width: `${pct}%`, borderRadius: 6, transition: "width 0.5s" }} />
    </div>
  );
}

function TabButton({ active, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px", border: "none", borderRadius: active ? 8 : 0, cursor: "pointer",
      background: active ? "#1F3A5F" : "transparent", color: active ? "#fff" : "#555",
      fontWeight: active ? 700 : 500, fontSize: 14, transition: "all 0.2s",
      borderBottom: active ? "none" : "2px solid transparent",
    }}>{label}</button>
  );
}

// --- Dashboard ---
function Dashboard() {
  const doneCount = MATH_CHAPTERS.filter(c => c.status === "done").length + CS408_CHAPTERS.filter(c => c.status === "done").length;
  const totalCount = MATH_CHAPTERS.length + CS408_CHAPTERS.length;
  const donePct = Math.round((doneCount / totalCount) * 100);
  const examDate = new Date("2026-12-20");
  const today = new Date();
  const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "距初试", value: `${daysLeft}天`, sub: "2026.12下旬", color: "#e74c3c" },
          { label: "累计学习", value: `${STUDY_STATS.total}h`, sub: `日均8h05m`, color: "#1F3A5F" },
          { label: "今日专注", value: `${Math.floor(STUDY_STATS.todayMinutes / 60)}h${STUDY_STATS.todayMinutes % 60}m`, sub: "8个番茄钟", color: "#2ecc71" },
          { label: "章节进度", value: `${doneCount}/${totalCount}`, sub: `${donePct}%`, color: "#3498db" },
        ].map((card, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${card.color}` }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1F3A5F" }}>6月专注时长分布</h3>
          {STUDY_STATS.subjects.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                <span style={{ color: "#333", fontWeight: 500 }}>{s.name}</span>
                <span style={{ color: "#888" }}>{s.hours}h ({s.pct}%)</span>
              </div>
              <ProgressBar value={s.pct} max={100} color={s.color} />
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1F3A5F" }}>7月重点调整</h3>
          {[
            { subject: "操作系统", action: "从零启动", hours: "目标60h", urgency: "紧急", color: "#e74c3c" },
            { subject: "计组", action: "大幅加量", hours: "目标45h", urgency: "重要", color: "#e67e22" },
            { subject: "计网", action: "减量调剂", hours: "目标20h", urgency: "正常", color: "#27ae60" },
            { subject: "高数", action: "进入强化", hours: "目标50h", urgency: "正常", color: "#3498db" },
            { subject: "数据结构", action: "二刷错题", hours: "目标40h", urgency: "正常", color: "#9b59b6" },
            { subject: "线代", action: "李永乐收尾", hours: "目标30h", urgency: "正常", color: "#1abc9c" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: i < 5 ? "1px solid #f0f0f0" : "none" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginRight: 8, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item.subject}</span>
              <span style={{ fontSize: 12, color: "#666" }}>{item.action}</span>
              <span style={{ fontSize: 11, color: "#999", marginLeft: 8, minWidth: 60, textAlign: "right" }}>{item.hours}</span>
              <span style={{
                fontSize: 10, padding: "2px 6px", borderRadius: 4, marginLeft: 8,
                background: item.urgency === "紧急" ? "#ffebee" : item.urgency === "重要" ? "#fff8e1" : "#e8f5e9",
                color: item.urgency === "紧急" ? "#c62828" : item.urgency === "重要" ? "#f57f17" : "#2e7d32",
              }}>{item.urgency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Knowledge Map ---
function KnowledgeMap() {
  const [view, setView] = useState("math");
  const chapters = view === "math" ? MATH_CHAPTERS : CS408_CHAPTERS;
  const grouped = {};
  const groupKey = view === "math" ? "module" : "subject";
  chapters.forEach(ch => {
    const g = ch[groupKey];
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(ch);
  });

  const moduleColors = {
    "前置基础": "#95a5a6", "高等数学": "#e74c3c", "线性代数": "#1abc9c", "概率论": "#9b59b6",
    "数据结构": "#3498db", "计算机组成原理": "#e67e22", "操作系统": "#2ecc71", "计算机网络": "#f39c12",
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setView("math")} style={{
          padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
          background: view === "math" ? "#1F3A5F" : "#eee", color: view === "math" ? "#fff" : "#555", fontWeight: 600,
        }}>数学一 ({MATH_CHAPTERS.length}章)</button>
        <button onClick={() => setView("408")} style={{
          padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
          background: view === "408" ? "#1F3A5F" : "#eee", color: view === "408" ? "#fff" : "#555", fontWeight: 600,
        }}>408专业课 ({CS408_CHAPTERS.length}章)</button>
      </div>

      {Object.entries(grouped).map(([group, chs]) => {
        const doneCount = chs.filter(c => c.status === "done").length;
        const color = moduleColors[group] || "#888";
        return (
          <div key={group} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: color, marginRight: 8 }} />
              <h3 style={{ margin: 0, fontSize: 15, color: "#333" }}>{group}</h3>
              <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>{doneCount}/{chs.length} 完成</span>
              <div style={{ flex: 1, marginLeft: 12 }}><ProgressBar value={doneCount} max={chs.length} color={color} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              {chs.map(ch => (
                <div key={ch.id} style={{
                  background: "#fff", borderRadius: 8, padding: 12, border: `1px solid ${ch.status === "done" ? "#d4edda" : ch.status === "inprogress" ? "#fff3cd" : "#eee"}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{ch.title}</span>
                    <StatusBadge status={ch.status} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {ch.keyTopics.map((t, i) => (
                      <span key={i} style={{ fontSize: 10, background: "#f0f4f8", color: "#555", padding: "2px 6px", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                  {ch.formulas && <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>{ch.formulas}张公式卡</div>}
                  {ch.score && <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>预估分值: ~{ch.score}分</div>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Problem Types ---
function ProblemTypes() {
  const [subject, setSubject] = useState("数据结构");
  const subjects = Object.keys(PROBLEM_TYPES);
  const types = PROBLEM_TYPES[subject] || [];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {subjects.map(s => (
          <button key={s} onClick={() => setSubject(s)} style={{
            padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13,
            background: subject === s ? "#1F3A5F" : "#f0f0f0", color: subject === s ? "#fff" : "#555", fontWeight: subject === s ? 700 : 500,
          }}>{s}</button>
        ))}
      </div>

      {types.map((t, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${t.difficulty === "核心" ? "#e74c3c" : t.difficulty === "难点" ? "#e67e22" : t.difficulty === "高频" ? "#f39c12" : t.difficulty === "易混" ? "#9b59b6" : "#3498db"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h4 style={{ margin: 0, fontSize: 15, color: "#1F3A5F" }}>{t.type}</h4>
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 4,
              background: t.difficulty === "核心" ? "#ffebee" : t.difficulty === "难点" ? "#fff8e1" : t.difficulty === "高频" ? "#fff3e0" : t.difficulty === "易混" ? "#f3e5f5" : "#e3f2fd",
              color: t.difficulty === "核心" ? "#c62828" : t.difficulty === "难点" ? "#e65100" : t.difficulty === "高频" ? "#ef6c00" : t.difficulty === "易混" ? "#7b1fa2" : "#1565c0",
            }}>{t.difficulty}</span>
          </div>
          <div style={{ fontSize: 13, color: "#333", marginBottom: 6 }}>
            <span style={{ fontWeight: 600 }}>解题思路：</span>{t.approach}
          </div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            <span style={{ fontWeight: 600 }}>典型例题：</span>{t.examples}
          </div>
          <div style={{ fontSize: 12, color: "#1F3A5F", background: "#f0f4f8", padding: "8px 12px", borderRadius: 6, marginTop: 8 }}>
            <span style={{ fontWeight: 600 }}>速记口诀：</span>{t.tips}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Error Book ---
function ErrorBook() {
  const [entries, setEntries] = useState([
    { id: 1, subject: "高等数学", chapter: "Ch1 极限", question: "求lim(x→0)(e^x-1-x)/x²", myAnswer: "用洛必达→1/2", correctApproach: "等价无穷小更快：e^x-1~x+x²/2，代入即得1/2", mistakeType: "方法选择", date: "2026-06-28", reviewCount: 0 },
    { id: 2, subject: "数据结构", chapter: "Ch5 树", question: "完全二叉树n个节点，叶子节点数？", myAnswer: "n/2", correctApproach: "n₀=⌈n/2⌉，当n为奇数时n₀=(n+1)/2", mistakeType: "边界条件", date: "2026-06-25", reviewCount: 1 },
    { id: 3, subject: "计算机网络", chapter: "Ch4 网络层", question: "子网掩码255.255.255.192，最多主机数？", myAnswer: "62", correctApproach: "主机位6位→2⁶-2=62 ✓，但需注意全0和全1不可用", mistakeType: "概念模糊", date: "2026-06-20", reviewCount: 2 },
  ]);
  const [showForm, setShowForm] = useState(false);

  const mistakeColors = { "方法选择": "#e74c3c", "边界条件": "#e67e22", "概念模糊": "#9b59b6", "计算错误": "#f39c12", "审题不清": "#3498db" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["全部", "高等数学", "数据结构", "计组", "操作系统", "计网"].map(tag => (
            <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: tag === "全部" ? "#1F3A5F" : "#f0f0f0", color: tag === "全部" ? "#fff" : "#666", cursor: "pointer" }}>{tag}</span>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#1F3A5F", color: "#fff", cursor: "pointer", fontSize: 13 }}>
          {showForm ? "取消" : "+ 记录错题"}
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <input placeholder="科目" style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }} />
            <input placeholder="章节" style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }} />
          </div>
          <textarea placeholder="题目描述" rows={2} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13, marginBottom: 8, resize: "vertical" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <input placeholder="我的错误答案/思路" style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }} />
            <input placeholder="正确解法" style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {Object.keys(mistakeColors).map(t => (
              <span key={t} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: mistakeColors[t] + "22", color: mistakeColors[t], cursor: "pointer" }}>{t}</span>
            ))}
          </div>
          <button style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: "#2ecc71", color: "#fff", cursor: "pointer", fontSize: 13 }}>保存</button>
        </div>
      )}

      {entries.map(entry => (
        <div key={entry.id} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1F3A5F" }}>{entry.subject}</span>
              <span style={{ fontSize: 11, color: "#888" }}>{entry.chapter}</span>
              <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: (mistakeColors[entry.mistakeType] || "#888") + "22", color: mistakeColors[entry.mistakeType] || "#888" }}>{entry.mistakeType}</span>
            </div>
            <span style={{ fontSize: 11, color: "#aaa" }}>{entry.date}</span>
          </div>
          <div style={{ fontSize: 13, color: "#333", marginBottom: 6, fontWeight: 500 }}>{entry.question}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "#ffebee", padding: 8, borderRadius: 6, fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: "#c62828", marginBottom: 2 }}>我的思路</div>
              {entry.myAnswer}
            </div>
            <div style={{ background: "#e8f5e9", padding: 8, borderRadius: 6, fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: "#2e7d32", marginBottom: 2 }}>正确解法</div>
              {entry.correctApproach}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "#888" }}>复习 {entry.reviewCount} 次</span>
            <span style={{ fontSize: 11, color: "#1F3A5F", cursor: "pointer" }}>下次复习: {SPACED_REP_DAYS[entry.reviewCount]}天后</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Review Plan ---
function ReviewPlan() {
  const today = new Date();
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const dailyPlan = [
    { time: "06:30-07:00", task: "英语背单词（墨墨APP）", duration: "30min", color: "#f39c12" },
    { time: "07:30-08:00", task: "早餐", duration: "-", color: "#eee" },
    { time: "08:00-09:30", task: "数学一：视频+笔记", duration: "90min", color: "#e74c3c" },
    { time: "09:30-10:00", task: "休息", duration: "-", color: "#eee" },
    { time: "10:00-11:30", task: "数学一：配套练习", duration: "90min", color: "#e74c3c" },
    { time: "12:00-13:00", task: "午休", duration: "-", color: "#eee" },
    { time: "13:00-14:30", task: "408专业课：视频+笔记", duration: "90min", color: "#3498db" },
    { time: "14:30-15:00", task: "休息", duration: "-", color: "#eee" },
    { time: "15:00-16:30", task: "408专业课：做题", duration: "90min", color: "#3498db" },
    { time: "16:30-17:00", task: "运动", duration: "-", color: "#eee" },
    { time: "17:00-18:00", task: "408第二科/薄弱科", duration: "60min", color: "#9b59b6" },
    { time: "18:30-19:30", task: "复习当日错题", duration: "60min", color: "#e67e22" },
    { time: "19:30-20:30", task: "英语阅读精读", duration: "60min", color: "#f39c12" },
    { time: "20:30-21:30", task: "Python/编程（碎片）", duration: "60min", color: "#2ecc71" },
  ];

  const weeklyFocus = [
    { day: "周一", math: "高数：积分计算", cs408: "操作系统：进程同步PV", review: "上周错题" },
    { day: "周二", math: "高数：积分应用", cs408: "操作系统：死锁银行家", review: "数据结构Ch1-2" },
    { day: "周三", math: "线代：特征值对角化", cs408: "计组：Cache映射", review: "计网Ch1-3" },
    { day: "周四", math: "线代：二次型", cs408: "计组：流水线冒险", review: "高数Ch1-3" },
    { day: "周五", math: "概率论：随机变量", cs408: "操作系统：内存管理", review: "综合回顾" },
    { day: "周六", math: "真题模拟（限时）", cs408: "数据结构：图论综合", review: "本周错题" },
    { day: "周日", math: "上午回顾", cs408: "自由复习", review: "下午休息" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1F3A5F" }}>今日时间表</h3>
          {dailyPlan.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "5px 0", borderBottom: i < dailyPlan.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <span style={{ fontSize: 11, color: "#888", width: 90, flexShrink: 0 }}>{item.time}</span>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginRight: 8, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: item.color === "#eee" ? "#aaa" : "#333" }}>{item.task}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{item.duration}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1F3A5F" }}>本周重点安排</h3>
          <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th style={{ padding: 6, textAlign: "left", color: "#888" }}>日</th>
                <th style={{ padding: 6, textAlign: "left", color: "#e74c3c" }}>数学</th>
                <th style={{ padding: 6, textAlign: "left", color: "#3498db" }}>408</th>
                <th style={{ padding: 6, textAlign: "left", color: "#e67e22" }}>复习</th>
              </tr>
            </thead>
            <tbody>
              {weeklyFocus.map((d, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: 6, fontWeight: 600, color: "#1F3A5F" }}>{d.day}</td>
                  <td style={{ padding: 6, color: "#555" }}>{d.math}</td>
                  <td style={{ padding: 6, color: "#555" }}>{d.cs408}</td>
                  <td style={{ padding: 6, color: "#888" }}>{d.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginTop: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1F3A5F" }}>艾宾浩斯复习节奏</h3>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {SPACED_REP_DAYS.map((d, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `rgba(31,58,95,${0.2 + i * 0.15})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>{d}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>天</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 8 }}>
          每道错题记录后，按 1天→3天→7天→14天→30天 的间隔复习5次，形成长期记忆
        </p>
      </div>
    </div>
  );
}

// --- Toolbox ---
function Toolbox() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 16 }}>
        {REPOS.map((repo, i) => (
          <a key={i} href={repo.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", transition: "transform 0.2s", borderLeft: "4px solid #1F3A5F" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 20, marginRight: 8 }}>{repo.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1F3A5F" }}>{repo.name}</span>
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>{repo.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <h3 style={{ fontSize: 15, color: "#1F3A5F", marginBottom: 12 }}>免费视频资源（B站）</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { name: "王道408配套课", search: "王道考研", subject: "408全科" },
          { name: "王卓数据结构", search: "青岛大学王卓 数据结构", subject: "数据结构" },
          { name: "湖科大教书匠计组", search: "湖科大教书匠 计组", subject: "计组" },
          { name: "哈工大李治军OS", search: "哈工大李治军 操作系统", subject: "操作系统" },
          { name: "中科大郑烇计网", search: "中科大郑烇 计算机网络", subject: "计网" },
          { name: "张宇基础30讲", search: "张宇基础30讲 2026", subject: "数学" },
          { name: "唐迟阅读的逻辑", search: "唐迟 阅读的逻辑", subject: "英语" },
          { name: "徐涛政治强化", search: "徐涛 政治强化班", subject: "政治" },
          { name: "3B1B线代本质", search: "线性代数的本质", subject: "线代直觉" },
        ].map((v, i) => (
          <div key={i} style={{ background: "#f8f9fa", borderRadius: 8, padding: 10, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 11, background: "#1F3A5F", color: "#fff", padding: "2px 6px", borderRadius: 4, marginRight: 8, flexShrink: 0 }}>{v.subject}</span>
            <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{v.name}</span>
            <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>B站搜: {v.search}</span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 15, color: "#1F3A5F", marginBottom: 12 }}>必备工具</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[
          { name: "番茄ToDo", desc: "专注计时+锁机+统计", type: "APP" },
          { name: "墨墨背单词", desc: "考研词汇+遗忘曲线", type: "APP" },
          { name: "Anki", desc: "间隔重复卡片", type: "APP" },
          { name: "研招网", desc: "报名/查分/调剂", type: "网站" },
          { name: "王道论坛", desc: "408真题/经验贴", type: "网站" },
          { name: "知乎考研话题", desc: "择校/经验/资讯", type: "网站" },
        ].map((tool, i) => (
          <div key={i} style={{ background: "#f8f9fa", borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{tool.name}</div>
            <div style={{ fontSize: 11, color: "#888" }}>{tool.desc}</div>
            <span style={{ fontSize: 10, background: tool.type === "APP" ? "#e3f2fd" : "#e8f5e9", color: tool.type === "APP" ? "#1565c0" : "#2e7d32", padding: "1px 6px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>{tool.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function KaoyanToolbox() {
  const [activeTab, setActiveTab] = useState("仪表盘");

  const renderContent = () => {
    switch (activeTab) {
      case "仪表盘": return <Dashboard />;
      case "知识图谱": return <KnowledgeMap />;
      case "题型攻略": return <ProblemTypes />;
      case "错题本": return <ErrorBook />;
      case "复习计划": return <ReviewPlan />;
      case "工具箱": return <Toolbox />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa", fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1F3A5F 0%, #2E75B6 100%)", padding: "20px 24px 12px", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>考研11408工具箱</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, opacity: 0.8 }}>中科大 AI与数据科学学院 085400专硕 | 跨考生专项</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>GitHub: sjkncs</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>番茄ToDo 累计 898h</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 16, overflowX: "auto" }}>
          {tabs.map(tab => (
            <TabButton key={tab} active={activeTab === tab} label={tab} onClick={() => setActiveTab(tab)} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, maxWidth: 960, margin: "0 auto" }}>
        {renderContent()}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 0", fontSize: 11, color: "#aaa" }}>
        搭配番茄ToDo使用 | 数据来源: GitHub repos + 番茄ToDo统计 | 2026考研倒计时
      </div>
    </div>
  );
}
