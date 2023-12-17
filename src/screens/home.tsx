import { useAsync } from 'react-use';

import { Tab, Card, Tabs, Chip, Spinner, Divider } from '@nextui-org/react';

import type { SymbolInfo } from '../global';
import type { QuoteType } from '../constants';

import { getTradeInfo } from '../apis';
import { QuoteTypes, SymbolStatus, OrderTypeTextMap } from '../constants';

const Home = () => {
  const state = useAsync(async () => {
    const res = await getTradeInfo();
    res.symbols = res.symbols.filter(
      symbol => symbol.status !== SymbolStatus.BREAK
    );
    return res;
  }, []);

  const { symbols = [] } = state.value || {};

  const others = new Set();
  const list: any = QuoteTypes.map(quote => {
    const res: SymbolInfo[] = [];
    symbols.forEach((symbol: SymbolInfo) => {
      if (symbol.quoteAsset === quote) {
        res.push(symbol);
      } else if (!QuoteTypes.includes(symbol.quoteAsset as QuoteType)) {
        others.add(symbol);
      }
    });
    return {
      quote,
      data: res,
    };
  });

  list.push({
    quote: 'Other',
    data: [...others],
  });

  const uniq = new Set();
  symbols.forEach(symbol => {
    uniq.add(symbol.baseAsset);
  });
  const assetsAmount = uniq.size;

  if (state.loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="conatiner space-y-4">
      <div>Wellcome to binance api!</div>

      <Tabs aria-label="Options">
        <Tab key="binance" title="Binance"></Tab>
        <Tab key="okx" title="OKX"></Tab>
      </Tabs>

      <div className="flex space-x-4">
        <Chip color="primary">{symbols.length} 个交易对</Chip>

        <Chip color="primary">{assetsAmount} 个币种</Chip>
      </div>

      <Tabs aria-label="Options">
        {list.map((group: any) => {
          return (
            <Tab
              key={group.quote}
              title={`${group.quote}币种(${group.data.length})`}
            >
              <div className=" grid grid-cols-6 gap-4">
                {group.data.map((symbol: SymbolInfo) => (
                  <Card className="p-2" key={symbol.symbol}>
                    <Chip
                      color={
                        symbol.status === SymbolStatus.TRADING
                          ? 'primary'
                          : symbol.status === SymbolStatus.BREAK
                            ? 'danger'
                            : 'warning'
                      }
                      radius="sm"
                    >
                      {symbol.symbol}
                    </Chip>

                    <Divider className="my-2"></Divider>

                    <div className=" flex space-x-2 flex-wrap">
                      {symbol.icebergAllowed && <Chip size="sm">冰山挂单</Chip>}
                      {symbol.ocoAllowed && <Chip size="sm">OCO挂单</Chip>}
                      {symbol.isSpotTradingAllowed && (
                        <Chip size="sm">现货交易</Chip>
                      )}
                      {symbol.isMarginTradingAllowed && (
                        <Chip size="sm">杠杆交易</Chip>
                      )}
                    </div>

                    <Divider className="my-2"></Divider>

                    <div className=" flex space-x-2 flex-wrap">
                      {symbol.orderTypes.map(orderType => (
                        <Chip size="sm">{OrderTypeTextMap[orderType]}</Chip>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
