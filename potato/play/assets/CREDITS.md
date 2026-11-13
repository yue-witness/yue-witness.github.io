# 资源来源与许可

| 文件 | 来源 | 许可 / 说明 |
|---|---|---|
| `carve/bg_workshop.jpg` | 2026-11-09 用 codex CLI 0.163 的内置 image_gen 生成（原图 1024×1536 PNG，压成 512×768 JPG q80，25KB） | 本项目原创生成物。提示词要点：昏暗老车间远墙、墨绿瓷砖、金属搁架上的搪瓷锅 / 罐子 / 木箱、管道与压力表、一盆绿植、两盏暖色钨丝灯，强烈景深虚化，无人物、无文字、无标志 |

以下全部在运行时程序化生成（Canvas 2D / three.js 几何），不含任何外部素材：

- 拉丝不锈钢颜色 / 粗糙度贴图、砧板木纹（拼板 + 刀痕 + 水渍）、刀柄木纹、刀刃锈迹、水面法线、柔和光斑：`client/src/carve/view/textures.ts`
- 果肉 / 芽眼截面着色（GLSL）、扫描加载失败时的程序化土豆皮：`client/src/carve/view/potatoMaterial.ts`
- 削皮小刀、直柄削皮器模型：`client/src/carve/view/KnifeModel.ts`
- 工作台、砧板、生土豆槽、水槽、水花：`client/src/carve/view/Stage.ts`
- 环境反射（暖色车间灯光盒 → PMREM）：`client/src/carve/view/CarveView.ts`

除下面「真实土豆扫描」一节外，未下载任何第三方资源；未使用参考游戏的任何美术资产（参考视频只用于轮廓形态的统计测量，见 P2 报告第十轮）。

## 界面图标（第四轮：下半屏切削区面板）
| 文件 | 来源 |
|---|---|
| `ui/ic_knife_dull.webp`、`ui/ic_knife_sharp.webp`、`ui/ic_peeler.webp`、`ui/ic_potato_raw.webp`、`ui/ic_potato_peeled.webp`、`ui/bg_paper.webp` | 直接复制自本项目 `prototype/ui-demo/assets/web/`（此前按 `prototype/ui-demo/assets/_brief.md` 用 codex image_gen 生成的原创资源，本项目自有） |

## 真实土豆扫描（第十轮：土豆形状与皮）

`potato/shapes.bin`、`potato/shapes.json`、`potato/skin.webp` 由 `tools/asset-pipeline/bake_potato.py` 从下列 3D 扫描烘焙而来：
按方向的半径图（形状）、按方向的皮颜色 + 细节高度贴图集。处理包括：主轴对齐、体积归一化、低频去光照、色调统一（向黄褐色靠 75%）。
原始 GLB 下载自 Objaverse（Hugging Face `allenai/objaverse`，数据集本身为 ODC-By 1.0；每个模型沿用 Sketchfab 上作者标注的许可），
放在 `assets/source/potato_scans/<uid>/model.glb`，不进构建。全部为 **CC BY 4.0**（允许商用，须署名）：

| # | 模型 | 作者（Sketchfab） | 链接 | 许可 |
|---|---|---|---|---|
| 0～4 | "20220822potato-5in1"（一个文件里 5 个土豆，分别烘焙） | andykwok91011 | https://sketchfab.com/3d-models/d199beffb780487587836d89c13e7fee | CC BY 4.0 |
| 5 | "Potato" | moshecaine | https://sketchfab.com/3d-models/0f4be86441694633b42c764a4574fd41 | CC BY 4.0 |
| 6 | "Potato" | _bmf_ | https://sketchfab.com/3d-models/d162368956e943dab5b95bdd97a10d3d | CC BY 4.0 |
| 7 | "potato" | Madman05 | https://sketchfab.com/3d-models/ada08ecce8184524b640e139050e1fd6 | CC BY 4.0 |

许可全文：https://creativecommons.org/licenses/by/4.0/ 。游戏内"关于 / 致谢"页面（P3 起）需列出上表的作品名、作者与许可，并注明"经修改（烘焙 / 调色）"。
另外下载过但没用的候选（形状不是土豆、表面有手写字或画脸、红皮带芽、非扫描的低模）：5a1593ce、bccf270c、c2b5ee64、23c52a98、fb851622、95ea6bab（同样在 `assets/source/potato_scans/` 下，不进构建，可删除）。

## 界面与区域场景（P3：渲染与 UI 框架；P3c 起部分已删除，见下节）
| 文件 | 来源 |
|---|---|
| `ui/ic_coin.webp`、`ui/ic_skill.webp`、`ui/ic_glove.webp`、`ui/ic_bucket.webp`、`ui/ic_sack.webp`、`ui/ic_wheelbarrow.webp`、`ui/ic_conveyor.webp`、`ui/ic_grabber.webp`、`ui/ic_machine_manual.webp`、`ui/ic_machine_auto.webp`、`ui/ic_fish.webp`、`ui/ic_syrup.webp`、`ui/ic_coat.webp`、`ui/cat_idle.webp`、`ui/cat_happy.webp`、`ui/stamp_a.webp`、`ui/stamp_b.webp`、`ui/stamp_c.webp`、`ui/bg_frost.webp` | 直接复制自本项目 `prototype/ui-demo/assets/web/`（按 `prototype/ui-demo/assets/_brief.md` 用 codex image_gen 生成的原创资源，本项目自有） |
| `ui/scene_shop.webp`、`ui/scene_warehouse.webp`、`ui/scene_delivery.webp`、`ui/scene_machines.webp`、`ui/scene_pet.webp` | 同上（区域 2～6 中央区的 P3 占位场景图，P4/P5 换正式 3D） |
| `ui/map_base.webp`、`ui/px_worker.webp`、`ui/px_cat.webp` | 同上（2.5D 地图像素底图、像素小人四向帧、像素猫） |
| `ui/px_worker.webp`（P5 重做） | 2026-11-10 用 codex CLI 0.163 内置 image_gen、以旧四向帧为参考图生成的原创像素小人走路循环（原图与提示词 `assets/source/p5_walker/`：下 / 右 / 上各 6 帧 + 咳嗽 1 帧，左向为右向镜像），由 `tools/asset-pipeline/walker_sheet.py` 抠底、统一缩到 48 美术像素高、64 色共用调色板、最近邻放大 3 倍，拼成 8×4 格精灵表（无损 WebP）。无文字、无符号。本项目自有 |

以下在运行时用 Canvas 2D 现画（无外部素材）：顶栏 / 底栏图标（齿轮、钟、地图、任务板、定位针、锁、小电视）、交付口指示灯光晕、"供 应 站"字牌、地图区域名纸签、"咳咳"气泡、爱心、印章文字章：`client/src/game/ui/glyphs.ts`、`client/src/game/zones/*.ts`、`client/src/render3d/MapScene.ts`。

## 切削区悬浮指示（P3c，界面方向 D）
| 文件 | 来源 |
|---|---|
| `carve/tray_tag.webp`、`carve/tray_arrow.webp` | 由本项目 `assets/source/ui_d/plate_tag.png`、`arrow_down.png` 缩小压成 WebP（按 `assets/source/ui_d/_brief.md` 用 codex image_gen 生成的原创资源，本项目自有） |

## 界面素材 D（P3c：公文纸极简风）
| 文件 | 来源 |
|---|---|
| `ui2/*.webp`（74 个：九宫格面板 / 标题条 / 页签 / 色带行 / 按钮 / 工作台挡板与读数槽 / HUD 小条 / 进度条 / 分隔线 / 便签 / 铭牌 / 箭头 / 印章 6 个 / 物品图标 `ic2_*` 32 个 / 技能图标 `sk_*` 12 个） | 2026-11-10 用 codex CLI 内置 image_gen 生成的原创素材（原图 `assets/source/ui_d/`，需求与提示词见该目录 `_brief.md`），由 `tools/asset-pipeline/ui_d.py` 裁边、缩放、压成 WebP。本项目自有。图中文字只有印章上的"国营加工站""已批"和评级字母（"报废"章 D-35 起退役，见下） |
| `ui2/map_base.webp` | 2026-11-10 用 codex CLI 内置 image_gen 生成的原创像素风厂区地图（单大厅布局）。P4f 以旧图（`assets/source/map_d/map_base.png`，本项目自有）为构图参考重画、加强分区（原图 `assets/source/map_e/map_base.png` = `map_base_a.png`，提示词 `assets/source/map_e/prompt_map_base_a.txt`），由 `tools/asset-pipeline/map_e.py` 最近邻缩到 780 宽。无文字、无俄文、无政治符号。本项目自有 |
| `ui2/zic_1.webp`～`ui2/zic_6.webp` | 2026-11-10 用 codex CLI 内置 image_gen 生成的原创地图区域标牌图标（原图与提示词 `assets/source/map_e/zic_*.png`、`prompt_zic_*.txt`），由 `tools/asset-pipeline/map_e.py` 裁边缩到 160。无文字。本项目自有 |

P3c 删除了不再使用的旧素材：`ui/bg_paper`、`ui/ic_*`（刀具、容器、机器、补给、铜币、奖章等 16 个）、`ui/map_base`、`ui/stamp_a/b/c`。仍在用的旧素材（区域 2～6 占位场景图、像素小人 / 猫、猫表情、飘起的土豆、结霜）见上一节，P4/P5 换正式 3D 后再清理。

P5-B（资源管线与首包）又移除了没有代码引用的素材，原文件移到 `assets/source/retired_p5b/`：`ui/scene_shop|warehouse|delivery|machines|pet.webp`（P3 区域占位场景图，已被 3D 场景取代）、`ui/cat_idle`、`ui/cat_happy`、`ui/ic_potato_raw|peeled`（P5-C 换成 `ui2/ic2_potato_*`）、`carve/bg_workshop.jpg`、`scenes/bg_stove.jpg`、`ui2/arrow_down`、`ui2/plate_tag`（运行时用的是 `carve/tray_*`）、`ui2/ic2_rank`。同期重新编码：`potato/skin.webp`（q80 + 细节高度无损，母版 `assets/source/potato_bake/skin_master.png`）、`potato/shapes.json`（半径图改为无损平面预测编码 `radiiP8`）、`ui2/map_base.webp`（q75）。

## 字体（P3c）
`fonts/*.woff2` 由 `tools/asset-pipeline/fonts_subset.py` 子集化（只含界面用到的约 670 个字符），均为 **SIL Open Font License 1.1**（可商用、可嵌入；子集化属于允许的修改，保留原版权与许可信息于字体 name 表）：

| 文件 | 字体 | 版权 |
|---|---|---|
| `fonts/serif-700.woff2` | Noto Serif SC（可变字重实例化为 700） | © 2017 Adobe（Source Han Serif）/ Google，OFL 1.1 |
| `fonts/sans-400.woff2`、`fonts/sans-700.woff2` | Noto Sans SC（实例化为 400 / 700） | © 2014–2021 Adobe（Source Han Sans）/ Google，OFL 1.1 |
| `fonts/mono-400.woff2`、`fonts/mono-700.woff2` | Liberation Mono 2.1.5 | © 2012 Red Hat, Inc.，OFL 1.1 |

许可全文：https://openfontlicense.org 。游戏内"关于 / 致谢"页需列出以上字体名与许可。

## 剧情纸张与结局插画（P4-C）
| 文件 | 来源 |
|---|---|
| `story/letter_paper.webp`、`story/note_scrap_1.webp`、`story/note_scrap_2.webp`、`story/memo_official.webp`、`story/envelope.webp` | 本项目 `assets/source/ui_d/` 同名 PNG（按 `assets/source/ui_d/_brief.md` E 节用 codex image_gen 生成的原创素材），裁掉透明边后长边缩到 768、WebP q82 |
| `story/ending_1.webp`（结局一：空荡的雪地与一张奖状）、`story/ending_2.webp`（结局二：雪地里一行朝北的脚印与一条麻袋布围巾） | 2026-11-10 用 codex CLI 0.163 内置 image_gen 生成（原图 1536×1024 PNG 在 `assets/source/story/`，提示词 `prompt_end1.txt` / `prompt_end2.txt`，日志 `codex_end*.log`），缩到 1024 宽、WebP q80。本项目原创生成物：铅笔淡彩旧纸风，无文字、无人物、无政治符号 |

以下在运行时程序化绘制（无外部素材）：纸条铅笔字 / 家信墨水字 / 公函宋体排版、蜡烛、回信纸条按钮、黑底字卡（`client/src/game/story/`）；纸条折角、纸卷、捏纸的手套指尖（`client/src/carve/view/NoteFx.ts`）；四种蔬菜的皮 / 瓤 / 芯 / 籽着色（`client/src/carve/view/potatoMaterial.ts`）。剧情文本全部原创（`shared/config/story.json`）。

## 区域 2～6 的 3D 场景（P4-B）
| 文件 | 来源 |
|---|---|
| `scenes/bg_store.jpg`（升级站库房远墙）、`scenes/bg_yard.jpg`（门外雪地院子）、`scenes/bg_flume.jpg`（交付口车间墙）、`scenes/bg_hall.jpg`（机械车间大厅）、`scenes/bg_stove.jpg`（炉边角落） | 2026-11-10 用 codex CLI 0.163 内置 image_gen 生成（原图 1536×1024 PNG 在 `assets/source/scenes_p4b/`，需求 `_brief.md`、提示词 `gen.sh`、日志 `codex_*.log`），`tools/asset-pipeline/scenes_bg.py` 缩到 768×512、轻微模糊、JPG q78（15～21KB/张）。本项目原创生成物：强烈景深虚化的写实远景，无文字、无人物、无俄文、无政治符号 |
| `scenes/bg_yard_day.jpg`（仓库院子白天：起雾的云杉林 + 雪地，P4-G） | 2026-11-10 用 codex CLI 0.163 内置 image_gen 生成（原图 1536×1024 PNG 在 `assets/source/scenes_p4g/B/`，提示词 `gen.sh`、日志 `codex_bg_yard_day.log`），`tools/asset-pipeline/scenes_bg_p4g_b.py` 缩到 768×512、轻微模糊、JPG q78（17KB）。本项目原创生成物：强烈景深虚化的写实远景，无文字、无人物、无建筑、无俄文、无政治符号 |

以下在运行时程序化生成（无外部素材）：柜台 / 货架 / 陈列品 / 台灯 / 信件格、土豆山（山体 + 土豆堆贴图 + 扫描土豆实例）、雪地与飘雪、铁桶 / 麻袋 / 独轮车 / 打包台 / 抓手 / 传送带、交付滑道 / 水池 / 水渠 / 计数牌 / 金币、手摇削皮机 / 自动削皮机 / 冒烟、炉子 / 猫窝 / 食盆 / 玩具、低模狸花猫（`client/src/game/scenes3d/`）；旧涂装钢、木板、雪地、麻袋布、砖墙、水泥、猫毛条纹、土豆堆、申领单纸面、流水、警示斜纹、滚筒等贴图（`client/src/game/scenes3d/kit/tex.ts`）。悬浮铭牌和箭头沿用切削区的 `carve/tray_tag.webp`、`carve/tray_arrow.webp`；手沿用切削区的手套模型；土豆沿用真实扫描（见上文）。


## 美术查缺补漏（P5-C）
| 文件 | 来源 |
|---|---|
| `ui2/ic2_potato_raw`、`ic2_potato_peeled`、`ic2_wheelbarrow2`、`ic2_crank2`、`ic2_slot`、`ic2_grabber_auto`、`ic2_combo`、`ic2_veg_carrot`、`ic2_veg_cucumber`、`ic2_veg_eggplant`、`ic2_veg_radish`、`ic2_cough`、`ic2_freeze`（`.webp`，13 个图标） | 2026-11-10 用 codex CLI 0.163 内置 image_gen 生成的原创素材（原图 `assets/source/p5c/*.png`，提示词 `prompt_*.txt`、调用脚本 `gen.sh`、日志 `codex_*.log`；以 `assets/source/ui_d/` 的同类图标为风格参考图），由 `tools/asset-pipeline/p5c.py` 裁边、长边 160、WebP q78。无文字 |
| `ui2/stamp_promote`（双线方框章，中间留空由程序写"晋升 / 职级 N"）、`ui2/stamp_issued`（"已配发"）、`ui2/stamp_quota`（"定额完成"）、`ui2/ui_skill_cell`（技能格档案小卡九宫格） | 同上。图中文字只有印章上的"已配发""定额完成" |
| `ui2/stamp_grade_s`、`ui2/stamp_grade_d`（评级章 S、D） | 2026-11-10（D-35）用 codex CLI 0.163 内置 image_gen 生成的原创素材，以 `assets/source/ui_d/stamp_grade_a.png` 为参考图、同一套双环红章只换字母（原图 `assets/source/ui_d/stamp_grade_s.png`、`stamp_grade_d.png`，调用脚本 `gen_grade_sd.sh`、提示词 `prompt_stamp_grade_*.txt`、日志 `codex_stamp_grade_*.log`），由 `tools/asset-pipeline/ui_d.py` 裁边、长边 320、WebP q80。图中只有一个拉丁字母 S / D。同期 `ui2/stamp_scrap`（"报废"章）因取消报废档从构建中移除（原图仍在 `assets/source/ui_d/`）。本项目自有 |
| `story/note_scrap_3.webp`（麻袋吊牌标签纸） | 同上，长边 768、WebP q72。不写字 |
| `fx/fx_blood.webp`（3 个血斑变体横排图集 768×256）、`fx/fx_note_edge.webp`（旧纸纹理 256²） | 同上（原图 `fx_blood_1..3.png` 为白底溅斑，管线按"离白多远"抠出透明度并统一压成暗红 #5A0E12 上下；`fx_note_edge.png` 缩到 256²）。土豆着色器运行时贴花 / 采样（`client/src/carve/view/potatoMaterial.ts`） |

全部为本项目原创生成物：无俄文 / 西里尔字母、无五角星、镰刀锤子、标语、旗帜、徽章、Logo、水印。
