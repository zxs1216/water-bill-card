水费卡
用于显示来自 MQTT（例如，青龙 → MQTT → Home Assistant）的水费账单数据的自定义 Lovelace 卡片。

✨ 特点
显示余额、欠款、使用情况和付款历史记录
点击查看对话框中的详细信息
响应式设计，并支持主题感知（浅色/深色模式）
可与单个 MQTT 传感器实体配合使用
📥 通过 HACS 安装
打开 HACS → 前端 → ⋮ → 自定义存储库
添加网址：https://github.com/zxs1216/water-bill-card
类别：洛夫莱斯
安装显卡
刷新浏览器
🧩 手动使用
添加到您的 Lovelace 控制面板：

type: custom:water-bill-card
entity: sensor.your_water_sensor
name: 水费账单
