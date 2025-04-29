type RollAnimationNames = 'rollIn' | 'rollOut';

type ShakeAnimationNames = 'shakeX' | 'shakeY' | 'headShake';

type FlipAnimationNames = 'flip' | 'flipInX' | 'flipInY' | 'flipOutX' | 'flipOutY';

type LightSpeedAnimationNames =
  | 'lightSpeedInRight'
  | 'lightSpeedInLeft'
  | 'lightSpeedOutRight'
  | 'lightSpeedOutLeft';

type RotateAnimationNames =
  | 'rotateIn'
  | 'rotateInDownLeft'
  | 'rotateInDownRight'
  | 'rotateInUpLeft'
  | 'rotateInUpRight'
  | 'rotateOut'
  | 'rotateOutDownLeft'
  | 'rotateOutDownRight'
  | 'rotateOutUpLeft'
  | 'rotateOutUpRight';

type SideAnimationNames =
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp';

type BackAnimationNames =
  | 'heartBeat'
  | 'backInDown'
  | 'backInLeft'
  | 'backInRight'
  | 'backInUp'
  | 'backOutDown'
  | 'backOutLeft'
  | 'backOutRight'
  | 'backOutUp';

type ZoomAnimationNames =
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomInUp'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'zoomOutUp';

type FadeAnimationNames =
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInTopLeft'
  | 'fadeInTopRight'
  | 'fadeInBottomLeft'
  | 'fadeInBottomRight'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutTopLeft'
  | 'fadeOutTopRight'
  | 'fadeOutBottomRight'
  | 'fadeOutBottomLeft';

type BounceAnimationNames =
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'bounceOutUp';

type OtherAnimations =
  | 'tada'
  | 'flash'
  | 'pulse'
  | 'swing'
  | 'jello'
  | 'hinge'
  | 'bounce'
  | 'wobble'
  | 'rubberBand'
  | 'jackInTheBox';

export type AnimationNames =
  | OtherAnimations
  | FadeAnimationNames
  | ZoomAnimationNames
  | SideAnimationNames
  | FlipAnimationNames
  | BackAnimationNames
  | RollAnimationNames
  | ShakeAnimationNames
  | BounceAnimationNames
  | RotateAnimationNames
  | LightSpeedAnimationNames;

interface Props {
  name: AnimationNames;
  repeat?: 1 | 2 | 3 | 'infinite';
  delay?: '1s' | '2s' | '3s' | '4s' | '5s';
  speed?: 'slow' | 'slower' | 'fast' | 'faster';
}

export const animator = ({ name, speed, repeat, delay }: Props): string => {
  if (!name) return '';
  const animationSpeed = speed ? `animate__${speed}` : '';
  const animationDelay = delay ? `animate__delay-${delay}` : '';
  const animationRepeat = repeat ? `animate__repeat-${repeat}` : '';

  return `animate__animated animate__${name} ${animationSpeed} ${animationRepeat} ${animationDelay}`.trim();
};
