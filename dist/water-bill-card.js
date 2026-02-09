
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("water-bill-card")
export class WaterBillCard extends LitElement {
  @property({ attribute: false }) public hass;
  @state() private _config;

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
  }

  render() {
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card style="padding:16px;">实体未找到</ha-card>`;
    }

    const attr = stateObj.attributes || {};
    const balance = parseFloat(stateObj.state) || 0;
    const totalArrears = parseFloat(attr.total_arrears) || 0;
    const currentArrears = parseFloat(attr.current_arrearage_money) || 0;
    const usage = parseFloat(attr.latest_history_amount) || 0;
    const priceText = attr.price_text || "未知阶梯";
    const paymentType = attr.latest_payment_type || "未缴费";
    const updateTime = (attr.update_time || "").split("T")[0] || "未知";
    const historyMonth = this.formatMonth(attr.latest_history_month);
    const historyMoney = attr.latest_history_money || 0;

    const isDark = this.hass.themes.darkMode;
    const bgColor = isDark ? "#1e1e1e" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#000000";
    const green = "#4CAF50";
    const red = "#F44336";
    const gray = isDark ? "#bbbbbb" : "#666666";

    return html`
      <ha-card style="background:${bgColor};color:${textColor};border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align:center;margin-bottom:16px;">
          <div style="font-size:18px;font-weight:bold;">${this._config.name || "水费账单"}</div>
          <div style="font-size:28px;font-weight:bold;color:${balance >= 0 ? green : red};margin-top:8px;">
            ${balance} 元
          </div>
        </div>

        <div style="margin:12px 0;padding:10px;background:rgba(0,0,0,0.05);border-radius:10px;text-align:center;">
          <div style="font-size:14px;opacity:0.9;">当前用水阶梯</div>
          <div style="font-size:16px;font-weight:bold;margin-top:4px;">${priceText}</div>
        </div>

        <div style="display:flex;gap:10px;margin:16px 0;">
          <div style="flex:1;text-align:center;padding:12px;background:rgba(0,0,0,0.05);border-radius:10px;cursor:pointer;" @click=${() => this.showDialog('上月用水详情', `用水量: ${usage} t\n水费: ${historyMoney} 元\n月份: ${historyMonth}`)}>
            <div style="font-size:12px;opacity:0.8;">上月用水</div>
            <div style="font-size:18px;font-weight:bold;color:${usage > 0 ? green : gray};margin-top:4px;">${usage} t</div>
          </div>
          <div style="flex:1;text-align:center;padding:12px;background:rgba(0,0,0,0.05);border-radius:10px;cursor:pointer;" @click=${() => this.showDialog('缴费状态', `最近缴费: ${attr.latest_payment_money || 0} 元\n时间: ${attr.latest_payment_date || '未知'}\n方式: ${paymentType}`)}>
            <div style="font-size:12px;opacity:0.8;">缴费状态</div>
            <div style="font-size:16px;font-weight:bold;color:${paymentType === '微信支付' ? green : red};margin-top:4px;">${paymentType}</div>
          </div>
          <div style="flex:1;text-align:center;padding:12px;background:rgba(0,0,0,0.05);border-radius:10px;">
            <div style="font-size:12px;opacity:0.8;">同步日期</div>
            <div style="font-size:14px;margin-top:4px;">${updateTime}</div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:12px;">
          <div style="text-align:center;flex:1;">
            <div style="font-size:12px;opacity:0.8;">总欠费</div>
            <div style="font-size:18px;font-weight:bold;color:${totalArrears > 0 ? red : green};">${totalArrears} 元</div>
          </div>
          <div style="text-align:center;flex:1;">
            <div style="font-size:12px;opacity:0.8;">当前欠费</div>
            <div style="font-size:18px;font-weight:bold;color:${currentArrears > 0 ? red : green};">${currentArrears} 元</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  formatMonth(monthStr) {
    if (!monthStr || monthStr.length !== 6) return "未知";
    return `${monthStr.substring(0,4)}年${monthStr.substring(4,6)}月`;
  }

  showDialog(title, content) {
    alert(`${title}\n\n${content}`);
  }

  static get styles() {
    return css` ha-card { width:100%; box-sizing:border-box; } `;
  }
}
