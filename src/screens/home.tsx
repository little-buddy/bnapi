import { useAsync } from 'react-use';
import { useRef, useState, useEffect, useCallback } from 'react';

import classnames from 'classnames';
import { Barbell, IceCream, Circuitry, Trademark } from '@phosphor-icons/react';
import {
  Tab,
  Card,
  Tabs,
  Chip,
  Image,
  Spinner,
  Divider,
  Tooltip,
} from '@nextui-org/react';

import type { SymbolInfo } from '../global';
import type { QuoteType } from '../constants';

import { toFloatNum } from '../utils';
import { getTradeInfo, getLatestPrice } from '../apis';
import {
  QuoteTypes,
  SymbolStatus,
  OrderTypeTextMap,
  OrderTypeSmTextMap,
} from '../constants';

const useIntervalAsyncFn = (
  callback: (...args: any) => Promise<void>,
  delay = 1000
) => {
  const timer = useRef<number>();
  const isClear = useRef(false);

  const fn = useCallback(async () => {
    try {
      await callback();
    } catch (error) {
      /*  */
    }
    if (isClear.current) {
      isClear.current = false;
      return;
    }

    timer.current = setTimeout(fn, delay);
  }, [callback, delay]);

  const cancel = () => {
    console.log('cancel');
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    } else {
      isClear.current = true;
    }
  };

  return { do: fn, cancel };
};

const SymbolCard = ({
  symbol,
  price: _price,
}: {
  symbol: SymbolInfo;
  price: string;
}) => {
  const [price, setPrice] = useState(_price || 0);
  const [priceColor, setPriceColor] = useState(0);
  const timer = useRef<number>();

  const doBack = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    timer.current = setTimeout(() => {
      setPriceColor(0);
    }, 1000);
  };

  useEffect(() => {
    if (_price === price) {
      return;
    }

    if (+_price > +price) {
      setPriceColor(1);
    } else {
      setPriceColor(-1);
    }

    setPrice(_price);
  }, [_price, price]);

  useEffect(() => {
    if (priceColor !== 0) {
      doBack();
    }
  }, [priceColor]);

  return (
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
        <div className="flex">
          <Image
            className="bg-white"
            width={20}
            height={20}
            src={`/token-icons/${symbol.baseAsset}.png`}
            loading="lazy"
            radius="full"
          />
          <span className="ml-2 font-bold">{symbol.baseAsset}</span>
        </div>
      </Chip>

      <Divider className="my-2"></Divider>

      <div className="flex justify-end">
        <Chip size="sm" className=" bg-[#181a20]">
          <div className="flex items-center">
            <Image
              width={16}
              height={16}
              src={`/token-icons/${symbol.quoteAsset}.png`}
              loading="lazy"
              radius="full"
            ></Image>
            <span
              className={classnames(
                'ml-1 text-sm text-white transition-all font-bold',
                {
                  '!text-[#0ECB81]': priceColor === 1,
                  '!text-[#F6465D]': priceColor === -1,
                }
              )}
            >
              {toFloatNum((price || '0') as string)}
            </span>
          </div>
        </Chip>
      </div>

      <Divider className="my-2"></Divider>

      <div className=" flex space-x-2 justify-end">
        {[
          { allowed: symbol.icebergAllowed, text: '冰山挂单', Icon: IceCream },
          { allowed: symbol.ocoAllowed, text: 'OCO挂单', Icon: Circuitry },
          {
            allowed: symbol.isSpotTradingAllowed,
            text: '现货交易',
            Icon: Trademark,
          },
          {
            allowed: symbol.isMarginTradingAllowed,
            text: '杠杆交易',
            Icon: Barbell,
          },
        ].map(({ allowed, Icon, text }) => {
          return (
            allowed && (
              <Tooltip
                content={text}
                closeDelay={0}
                placement="bottom"
                key={text}
                size="sm"
              >
                <Icon color="#f31260" size={16} weight="duotone" />
              </Tooltip>
            )
          );
        })}
      </div>

      <Divider className="my-2"></Divider>

      <div className=" flex justify-between">
        {symbol.orderTypes.map(orderType => (
          <Tooltip
            content={OrderTypeTextMap[orderType]}
            closeDelay={0}
            placement="bottom"
            size="sm"
            key={orderType}
          >
            <span className=" cursor-default  text-[10px] text-white bg-[#181a20] px-1 rounded">
              {OrderTypeSmTextMap[orderType]}
            </span>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};

const Home = () => {
  const [symbolPrices, setSymbloPrices] = useState<Record<string, string>>({});

  const state = useAsync(async () => {
    const [res] = await Promise.all([getTradeInfo()]);
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

  const intervalPrice = useIntervalAsyncFn(
    useCallback(async () => {
      const prices = await getLatestPrice();
      // console.log(123);
      const symbolPrice: any = {};
      prices.forEach(({ symbol, price }) => {
        symbolPrice[symbol] = price;
      });
      setSymbloPrices(symbolPrice);
    }, [setSymbloPrices]),
    5000
  );

  list.push({
    quote: 'Other',
    data: [...others],
  });

  const uniq = new Set();
  symbols.forEach(symbol => {
    uniq.add(symbol.baseAsset);
  });
  const assetsAmount = uniq.size;

  useEffect(() => {
    intervalPrice.do();
    return intervalPrice.cancel;
  }, []);

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
                {group.data.reverse().map((symbol: SymbolInfo) => (
                  <SymbolCard
                    symbol={symbol}
                    price={symbolPrices[symbol.symbol] || '0'}
                    key={symbol.symbol}
                  ></SymbolCard>
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
