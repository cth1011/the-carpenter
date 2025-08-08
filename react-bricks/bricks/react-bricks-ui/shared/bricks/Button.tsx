import classNames from 'classnames'
import { Text, Link, types, isAdmin } from 'react-bricks/rsc'
import blockNames from '../../blockNames'
import { buttonColors, animationColors } from '../../colors'
import {
  buttonColorsEditProps,
  buttonAnimationColorsEditProps,
} from '../../LayoutSideProps'
import ButtonClient from './ButtonClient'

export interface ButtonProps {
  type: 'button' | 'link'
  text: types.TextValue
  href: string
  isTargetBlank: boolean
  buttonType: 'submit' | 'button' | 'reset'
  buttonColor: {
    color: string
    classNameSolid: string
    classNameOutline: string
  }
  buttonAnimationColor: {
    color: string
    className: string
  }
  variant: 'solid' | 'outline' | 'ghost'
  padding: 'normal' | 'small'
  className?: string
  simpleAnchorLink: boolean
  disabled?: boolean
}

const Button: types.Brick<ButtonProps> = ({
  type,
  href,
  isTargetBlank,
  buttonType,
  buttonColor,
  buttonAnimationColor,
  variant,
  padding,
  className,
  simpleAnchorLink = false,
  text,
  disabled = false,
}) => {
  const target = isTargetBlank
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (type === 'link') {
    return (
      <Link
        href={href}
        {...target}
        className={classNames(
          'group relative overflow-hidden rounded-lg px-8 py-4 text-sm font-semibold text-black focus:outline-none',
          padding === 'small'
            ? 'py-2 px-4 text-sm min-w-[75px]'
            : 'px-8 py-4 min-w-[120px]',
          {
            [buttonColor?.classNameSolid]: variant === 'solid',
          },
          {
            [buttonColor?.classNameOutline]: variant === 'outline',
          },

          className
        )}
        simpleAnchor={simpleAnchorLink}
      >
        <span
          className={classNames(
            'absolute inset-0 rounded-full transform scale-0 transition-transform duration-500 group-hover:scale-150',
            buttonAnimationColor?.className
          )}
        ></span>
        <Text
          propName="text"
          value={text}
          placeholder="Action"
          renderBlock={({ children }) => (
            <span className="relative text-black transition-colors duration-500 group-hover:text-white">
              {children}
            </span>
          )}
        />
      </Link>
    )
  }

  if (!isAdmin() && buttonType !== 'submit') {
    return (
      <button
        type={isAdmin() ? 'button' : buttonType}
        // type={isAdmin && !previewMode ? 'button' : buttonType}
        disabled={disabled}
        //disabled={isAdmin && !previewMode}
        className={classNames(
          'inline-block whitespace-nowrap text-center rounded-full font-bold leading-none hover:shadow-lg transition-all ease-out duration-150 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
          padding === 'small'
            ? 'py-2 px-4 text-sm min-w-[75px]'
            : 'py-3 px-5 min-w-[120px]',
          {
            [buttonColor?.classNameSolid]: variant === 'solid',
          },
          {
            [buttonColor?.classNameOutline]: variant === 'outline',
          },
          className
        )}
      >
        <Text
          propName="text"
          value={text}
          placeholder="Action"
          renderBlock={({ children }) => <span>{children}</span>}
        />
      </button>
    )
  }

  return (
    <ButtonClient
      type={type}
      href={href}
      isTargetBlank={isTargetBlank}
      buttonType={buttonType}
      buttonColor={buttonColor}
      variant={variant}
      padding={padding}
      className={className}
      simpleAnchorLink={simpleAnchorLink}
      text={text}
      disabled={disabled}
    ></ButtonClient>
  )
}

Button.schema = {
  name: blockNames.Button,
  label: 'Button',
  category: 'shared',
  hideFromAddMenu: true,
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/shared/Button.tsx',

  getDefaultProps: () => ({
    type: 'link',
    text: 'Click me',
    href: '',
    isTargetBlank: false,
    buttonType: 'submit',
    buttonColor: buttonColors.SKY.value,
    buttonAnimationColor: animationColors.ORANGE.value,
    variant: 'solid',
    padding: 'normal',
  }),
  sideEditProps: [
    {
      groupName: 'Button functionality',
      defaultOpen: true,
      props: [
        {
          name: 'type',
          label: 'Type',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'link', label: 'Link' },
              { value: 'button', label: 'Form Button' },
            ],
          },
        },
        {
          name: 'href',
          label: 'Link (external or path)',
          type: types.SideEditPropType.Text,
          show: (props) => props.type === 'link',
        },
        {
          name: 'isTargetBlank',
          label: 'Open in new window',
          type: types.SideEditPropType.Boolean,
          show: (props) => props.type === 'link',
        },
        {
          name: 'simpleAnchorLink',
          label: 'Simple anchor (no SPA link)',
          type: types.SideEditPropType.Boolean,
          show: (props) => props.type === 'link',
        },
        {
          name: 'buttonType',
          label: 'Button type',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'submit', label: 'Form submit' },
              { value: 'reset', label: 'Form reset' },
              { value: 'button', label: 'Button' },
            ],
          },
          show: (props) => props.type === 'button',
        },
      ],
    },
    {
      groupName: 'Visual',
      defaultOpen: true,
      props: [
        buttonColorsEditProps,
        buttonAnimationColorsEditProps,
        {
          name: 'variant',
          label: 'Variant',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'solid', label: 'Solid' },
              { value: 'outline', label: 'Outline' },
              { value: 'ghost', label: 'Ghost' },
            ],
          },
        },

        {
          name: 'padding',
          label: 'Size',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'normal', label: 'Normal' },
              { value: 'small', label: 'Small' },
            ],
          },
        },
      ],
    },
  ],
}

export default Button
