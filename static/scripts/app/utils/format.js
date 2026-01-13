import {MONEY} from "../config/constants.js";

export function money(n) {
    const val = Number.isFinite(n) ? n : 0;
    return `${MONEY.currencySymbol}${val.toFixed(MONEY.decimals)}`;
}
