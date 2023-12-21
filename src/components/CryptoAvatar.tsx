import type { FC } from 'react';

import { Image } from '@nextui-org/react';

import ChristmasHat from '../assets/imgs/santa_hat.png';

interface CryptoAvatarProps {
  crypto: string;
  size?: number;
  merrychristmas?: boolean;
}

const CryptoAvatar: FC<CryptoAvatarProps> = ({
  crypto,
  size = 20,
  merrychristmas = false,
}) => {
  const hatSize = size * 1.4;

  return (
    <div className=" relative">
      <Image
        className="bg-white"
        width={size}
        height={size}
        src={`/token-icons/${crypto}.png`}
        loading="lazy"
        radius="full"
      ></Image>
      {merrychristmas && (
        <Image
          className=" max-w-none"
          classNames={{
            wrapper: 'absolute top-0 left-0 -translate-y-1/2 z-10',
          }}
          width={hatSize}
          height={hatSize}
          src={ChristmasHat}
        ></Image>
      )}
    </div>
  );
};

export default CryptoAvatar;
