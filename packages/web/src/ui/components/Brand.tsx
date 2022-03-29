import logo from '/brand/logo.png';
import figure from '/brand/figure.png';

interface LogoProps {
  width: number;
  height: number;
  dark?: boolean;
}

function Logo({ width, height }: LogoProps) {
  return <img src={logo} width={width} height={height} alt="HBA Logo" />;
}

function Figure({ width, height }: LogoProps) {
  return <img src={figure} width={width} height={height} alt="HBA" />;
}

export const Brand = {
  Logo,
  Figure
};
