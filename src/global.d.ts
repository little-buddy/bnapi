import type {
  STPMode,
  OrderType,
  SymbolType,
  LimitInterval,
  RateLimitType,
} from './constants';

/*
  STP Self-Trade Prevention
 */

export interface SymbolInfo {
  symbol: string /* 交易对 */;
  status: string /* 交易对状态 */;
  baseAsset: string /* 代币 */;
  baseAssetPrecision: number /* 代币精度 */;
  quoteAsset: string /* 交易代币 */;
  quotePrecision: number /* 交易代币精度 */;
  baseCommissionPrecision: number /* 佣金精度 */;
  quoteCommissionPrecision: number;
  orderTypes: OrderType[] /* 支持交易类型 */;
  icebergAllowed: boolean /* 冰山订单 */;
  ocoAllowed: boolean /* oco订单 */;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean /* 现货交易 */;
  isMarginTradingAllowed: boolean /* 杠杆交易 */;
  permissions: SymbolType[];
  defaultSelfTradePreventionMode: STPMode;
  allowSelfTradePreventionModes: STPMode[];
}

export interface RateLimitInfo {
  rateLimitType: RateLimitType;
  interval: LimitInterval;
  intervalNum: number;
  limit: number;
}
