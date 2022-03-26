import Image from 'next/image';
import logo from '~/public/brand/logo.png';
import figure from '~/public/brand/figure.png';

interface LogoProps {
  width: number;
  height: number;
  dark?: boolean;
}

function Logo({ width, height }: LogoProps) {
  return <Image src={logo} width={width} height={height} alt="HBA Logo" />;
}

function Figure({ width, height }: LogoProps) {
  return <Image src={figure} width={width} height={height} alt="HBA" />;
}

export const Brand = {
  Logo,
  Figure
};
