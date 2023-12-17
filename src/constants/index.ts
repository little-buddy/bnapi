/* 交易对状态 */
export enum SymbolStatus {
  PER_TRADING = 'PER_TRADING' /* 交易前 */,
  TRADING = 'TRADING',
  POST_TRADING = 'POST_TRADING' /* 交易后 */,
  END_OF_DAY = 'END_OF_DAY',
  HALT = 'HALT',
  AUCTION_MATCH = 'AUCTION_MATCH',
  BREAK = 'BREAK',
}

/* 交易对类型 */
export enum SymbolType {
  SPOT = 'SPOT' /* 现货 */,
  MARGIN = 'MARGIN' /* 杠杆 */,
  TRD_GRP_002 = 'TRD_GRP_002' /* 交易组 002 */,
  TRD_GRP_003 = 'TRD_GRP_003' /* 交易组 003 */,
  TRD_GRP_004 = 'TRD_GRP_004' /* 交易组 004 */,
  TRD_GRP_005 = 'TRD_GRP_005' /* 交易组 005 */,
  TRD_GRP_006 = 'TRD_GRP_006' /* 交易组 006 */,
  TRD_GRP_007 = 'TRD_GRP_007' /* 交易组 007 */,
  TRD_GRP_008 = 'TRD_GRP_008' /* 交易组 008 */,
  TRD_GRP_009 = 'TRD_GRP_009' /* 交易组 009 */,
  TRD_GRP_010 = 'TRD_GRP_010' /* 交易组 010 */,
  TRD_GRP_011 = 'TRD_GRP_011' /* 交易组 011 */,
  TRD_GRP_012 = 'TRD_GRP_012' /* 交易组 012 */,
  TRD_GRP_013 = 'TRD_GRP_013' /* 交易组 013 */,
  TRD_GRP_014 = 'TRD_GRP_014' /* 交易组 014 */,
  TRD_GRP_015 = 'TRD_GRP_015' /* 交易组 015 */,
  TRD_GRP_016 = 'TRD_GRP_016' /* 交易组 016 */,
  TRD_GRP_017 = 'TRD_GRP_017' /* 交易组 017 */,
  TRD_GRP_018 = 'TRD_GRP_018' /* 交易组 018 */,
  TRD_GRP_019 = 'TRD_GRP_019' /* 交易组 019 */,
  TRD_GRP_020 = 'TRD_GRP_020' /* 交易组 020 */,
  TRD_GRP_021 = 'TRD_GRP_021' /* 交易组 021 */,
  TRD_GRP_022 = 'TRD_GRP_022' /* 交易组 022 */,
  TRD_GRP_023 = 'TRD_GRP_023' /* 交易组 023 */,
  TRD_GRP_024 = 'TRD_GRP_024' /* 交易组 024 */,
  TRD_GRP_025 = 'TRD_GRP_025' /* 交易组 025 */,
}

/* 订单状态 */
export enum OrderStatus {
  NEW = 'NEW' /* 订单被交易引擎接 */,
  PARTIALLY_FILLED = 'PARTIALLY_FILLED' /* 部分订单被成交 */,
  FILLED = 'FILLED' /* 订单完全成交 */,
  CANCELLED = 'CANCELLED' /* 用户撤销订单 */,
  PENDING_CANCEL = 'PENDING_CANCEL' /* 撤销中(目前并未使用) */,
  REJECTED = 'REJECTED' /* 订单没有被交易引擎接受，也没被处理 */,
  EXPIRED = 'EXPIRED' /* 订单被交易引擎取消 */,
  EXPIRED_IN_MATCH = 'EXPIRED_IN_MATCH' /* 订单由于STP触发而过期 */,
}

export enum OrderType {
  LIMIT = 'LIMIT' /* 限价单 */,
  LIMIT_MAKER = 'LIMIT_MAKER' /* 限价只挂单 */,
  MARKET = 'MARKET' /* 市场价 */,
  STOP_LOSS = 'STOP_LOSS' /* 止损单 */,
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT' /* 限价止损单*/,
  TAKE_PROFIT = 'TAKE_PROFIT' /* 止盈单 */,
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT' /* 限价止盈单 */,
}

export const OrderTypeTextMap = {
  [OrderType.LIMIT]: '限价单',
  [OrderType.LIMIT_MAKER]: '限价只挂单',
  [OrderType.MARKET]: '市价单',
  [OrderType.STOP_LOSS]: '止损单',
  [OrderType.STOP_LOSS_LIMIT]: '限价止损单',
  [OrderType.TAKE_PROFIT]: '止盈单',
  [OrderType.TAKE_PROFIT_LIMIT]: '限价止盈单',
};

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderTimeinForce {
  GTC = 'GTC' /* 成交为止 */,
  IOC = 'IOC' /* 无法立即成交的部分就撤销 */,
  FOK = 'FOK' /* 无法全部成交就撤销 */,
}

export enum RateLimitType {
  REQUEST_WEIGHT = 'REQUEST_WEIGHT' /* 单位时间请求权重之和上限 */,
  ORDERS = 'ORDERS' /* 单位时间下单次数限制 */,
  RAW_REQUESTS = 'RAW_REQUESTS' /* 单位时间请求次数上限 */,
}

export enum LimitInterval {
  SECOND = 'SECOND',
  MINUTE = 'MINUTE',
  DAY = 'DAY',
}

export enum KlinesInterval {
  '1s' = '1s',
  '1m' = '1m',
  '3m' = '3m',
  '5m' = '5m',
  '15m' = '15m',
  '30m' = '30m',
  '1h' = '1h',
  '2h' = '2h',
  '4h' = '4h',
  '6h' = '6h',
  '8h' = '8h',
  '12h' = '12h',
  '1d' = '1d',
  '3d' = '3d',
  '1w' = '1w',
  '1M' = '1M',
}

/* 自我交易防御类型 */
export enum STPMode {
  NONE = 'NONE',
  EXPIRE_TAKER = 'EXPIRE_TAKER',
  EXPIRE_BOTH = 'EXPIRE_BOTH',
  EXPIRE_MAKER = 'EXPIRE_MAKER',
}

export enum QuoteType {
  BTC = 'BTC',
  ETH = 'ETH',
  BNB = 'BNB',
  TRY = 'TRY',
  USDT = 'USDT',
  USDC = 'USDC',
  TUSD = 'TUSD',
  BUSD = 'BUSD',
  FDUSD = 'FDUSD',
  USDS = 'USDS',
  PAX = 'PAX',
  XRP = 'XRP',
  TRX = 'TRX',
  NGN = 'NGN',
  RUB = 'RUB',
  ZAR = 'ZAR',
  EUR = 'EUR',
  BKRW = 'BKRW',
  GBP = 'GBP',
  BIDR = 'BIDR',
  AUD = 'AUD',
  DAI = 'DAI',
  IDRT = 'IDRT',
  UAH = 'UAH',
  BRL = 'BRL',
  USDP = 'USDP',
  UST = 'UST',
  PLN = 'PLN',
  RON = 'RON',
  ARS = 'ARS',
  BVND = 'BVND',
  VAI = 'VAI',
  AEUR = 'AEUR',
}

export const QuoteTypes = [
  QuoteType.BTC,
  QuoteType.ETH,
  QuoteType.BNB,
  QuoteType.USDT,
  QuoteType.USDC,
  QuoteType.TUSD,
  QuoteType.BUSD,
  QuoteType.FDUSD,
  QuoteType.TRY,
  QuoteType.USDS,
  QuoteType.XRP,
  QuoteType.PAX,
  QuoteType.TRX,
  QuoteType.NGN,
  QuoteType.RUB,
  QuoteType.AUD,
  QuoteType.BIDR,
  QuoteType.BKRW,
  QuoteType.DAI,
  QuoteType.ZAR,
  QuoteType.EUR,
  QuoteType.GBP,
  QuoteType.IDRT,
  QuoteType.UAH,
  QuoteType.BRL,
  QuoteType.USDP,
  QuoteType.UST,
  QuoteType.PLN,
  QuoteType.RON,
  QuoteType.ARS,
  QuoteType.BVND,
  QuoteType.VAI,
  QuoteType.AEUR,
];
