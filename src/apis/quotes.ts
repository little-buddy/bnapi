import type { TradeType } from './constants';
import type { SymbolInfo, RateLimitInfo } from '../global';

import http, { wrapperV3 } from './http';

/**
 * 测试服务器连通性
 * https://binance-docs.github.io/apidocs/spot/cn/#16073bbcf1
 * @weight 1
 */
export const pingServer = () => http.get(wrapperV3('ping'));

// 获取服务器时间

/**
 * 测试服务器连通性
 * https://binance-docs.github.io/apidocs/spot/cn/#3f1907847c
 * @weight 1
 */
export const getServerTime = () => http.get(wrapperV3('time'));

/**
 * 交易规范信息
 * https://binance-docs.github.io/apidocs/spot/cn/#e7746f7d60
 * @weight 20
 */
interface IExchangeInfoParams {
  symbol?: string;
  symbols?: string[];
  permissions?: TradeType | TradeType[];
}

interface IExchangeInfoRes {
  timezone: 'UTC';
  serverTimer: number;
  rateLimits: RateLimitInfo[];
  exchangeFilters: any[];
  symbols: SymbolInfo[];
}

export const getTradeInfo = (
  params?: IExchangeInfoParams
): Promise<IExchangeInfoRes> =>
  http.get(wrapperV3('exchangeInfo'), {
    params,
  });

/**
 * 深度信息
 * https://binance-docs.github.io/apidocs/spot/cn/#38a975b802
 * @weight 5(1-100) 25(101-500) 50(501-1000) 250(1001-5000)
 */
export const getDepthIno = (symbol: string, limit = 100) =>
  http.get(wrapperV3('depth'), {
    params: { symbol, limit },
  });

/**
 * 近期成交列表
 * https://binance-docs.github.io/apidocs/spot/cn/#2c5e424c25
 * @weight 10
 */
export const getRecentTxList = (symbol: string, limit = 500) =>
  http.get(wrapperV3('trades'), {
    params: {
      symbol,
      limit,
    },
  });

/**
 * 查询历史成交
 * https://binance-docs.github.io/apidocs/spot/cn/#5221bade13
 * @weight 10
 */
interface IHistoryTx {
  symbol: string;
  limit?: number;
  fromtid?: number;
}

export const queryHistoryTx = (params: IHistoryTx) =>
  http.get(wrapperV3('historicalTrades'), {
    params,
  });

/**
 * 近期成交(归集)
 * https://binance-docs.github.io/apidocs/spot/cn/#c59e471e81
 * @weight 2
 */

interface IRecentTxSetParams {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number; // default 500
}

export const getRecentTxSet = (params: IRecentTxSetParams) =>
  http.get(wrapperV3('aggTrades'), {
    params,
  });

/**
 * K线数据
 * https://binance-docs.github.io/apidocs/spot/cn/#k
 * @weight 2
 */
interface IKlineParams {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  timeZone?: string; // default 0
  limit?: number; // default 500
}

export const getKlines = (params: IKlineParams) =>
  http.get(wrapperV3('klines'), {
    params,
  });

/**
 * 当前平均价格
 * https://binance-docs.github.io/apidocs/spot/cn/#3b4f48cdbb
 * @weight 2
 */

export const getCurAvgPrice = (symbol: string) =>
  http.get(wrapperV3('avgPrice'), {
    params: {
      symbol,
    },
  });

/**
 * UIK线数据
 * https://binance-docs.github.io/apidocs/spot/cn/#uiks
 * @weight 2
 */

export const getUIKlines = (params: IKlineParams) =>
  http.get(wrapperV3('uiKlines'), {
    params,
  });

/**
 * 24hr价格变动情况
 * https://binance-docs.github.io/apidocs/spot/cn/#24hr
 * @weight 2(1-20) 40(21-100) 80(>=101) symbol的个数
 */

interface I24HPriceParams {
  symbol?: string;
  symbols?: string[];
  type?: 'FULL' | 'NULL';
}

export const get24HPrice = (params?: I24HPriceParams) =>
  http.get(wrapperV3('ticker/24hr'), {
    params,
  });

/**
 * 交易日行情
 * https://binance-docs.github.io/apidocs/spot/cn/#ticker
 * @weight 4 * symbol num, max = 200
 */
interface IDailyTickerParams {
  symbol: string;
  symbols: string[];
  timeZone?: string;
  type: 'FULL' | 'MINI';
}

export const getDailyTicker = (params: IDailyTickerParams) =>
  http.get(wrapperV3('ticker/tradingDay'), {
    params,
  });

//
//

/**
 * 最新价格
 * https://binance-docs.github.io/apidocs/spot/cn/#8ff46b58de
 * @weight 2(1) 4(>1)
 */

interface ILatestPriceParams {
  symbol: string;
  symbols: string[];
}

export const getLatestPrice = (params: ILatestPriceParams) =>
  http.get(wrapperV3('ticker/price'), {
    params,
  });

/**
 * 当前最优挂单
 * https://binance-docs.github.io/apidocs/spot/cn/#5393cd07b4
 * @weight 2(1) 4(>1)
 */

interface IBestOrder extends ILatestPriceParams {}

export const getBestOrder = (params: IBestOrder) =>
  http.get(wrapperV3('ticker/bookTicker'), {
    params,
  });

/**
 * 滚动窗口价格变动统计
 * https://binance-docs.github.io/apidocs/spot/cn/#4175e32579
 * @weight 4 * symbol num
 */

interface IWidnowPriceCalcParams {
  symbol: string;
  symbols: string[];
  windowSizE: string;
  type: 'FULL' | 'MINI';
}

export const getWindowPriceCalc = (params: IWidnowPriceCalcParams) =>
  http.get(wrapperV3('ticker'), {
    params,
  });
