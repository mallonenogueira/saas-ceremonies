import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";
import { inputIconStyle } from "./inputIcon";

export const theme = extendTheme(
  {
    colors: {
      primary: {
        // ...baseTheme.colors.green,
        "25": "#D2D9D1",
        "50": "#B2C0B3",
        "100": "#94A698",
        "200": "#768C7F",
        "300": "#587268",
        "400": "#3A5852",
        "500": "#1C3E3D",
        "600": "#183137",
        "700": "#14252F",
        "800": "#101A28",
        "900": "0D1020",
        opacity: {
          500: "#58726899",
        },
      },
    },
    shadows: {
      outline: `0 0 0 3px var(--chakra-colors-primary-opacity-500)`,
    },
    components: {
      InputIcon: inputIconStyle,
      Input: {
        defaultProps: {
          focusBorderColor: "primary.opacity.500",
        },
      },
      FormLabel: {
        baseStyle: {
          fontSize: "sm",
          mb: "1",
        },
      },
      Table: {
        sizes: {
          custom: {
            th: {
              px: "5",
              py: "3",
              lineHeight: "4",
              fontSize: "xs",
            },
            td: {
              px: "5",
              py: "3",
              lineHeight: "4",
              fontSize: "sm",
            },
            caption: {
              px: "4",
              py: "2",
              fontSize: "xs",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  }),
  withDefaultProps({
    defaultProps: {
      focusBorderColor: "primary.500",
    },
  })
);
