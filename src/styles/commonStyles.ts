import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgb(255, 251, 255)', // From your theme
    },
    input: {
        marginBottom: 16, // Slightly increased from 12
    },
    card: {
        marginBottom: 12, // Slightly increased from 10
        borderRadius: 12,
        // Shadow styling moved to component-specific files for more control
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        elevation: 6, // Increased elevation
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    segmented: {
        marginBottom: 16, // Increased from 10
    },
    button: {
        marginTop: 24, // Increased from 16
        paddingVertical: 8, // Added padding for better touch target
    },
    total: {
        marginBottom: 16, // Increased from 10
        fontWeight: '600',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10, // Increased from 8
        marginBottom: 12, // Added margin bottom
    },
    chip: {
        borderWidth: 1,
        marginBottom: 8,
        height: 36, // Explicit height for better touch target
    },
    searchBar:{
        marginBottom: 16, // Increased from 12
    },
    textarea: {
        minHeight: 100, // Increased from 80
        textAlignVertical: 'top',
        paddingTop: 12, // Added padding for text position
    }
});

// No changes needed to generatedColor as it's already well defined
export const generatedColor = {
    "colors": {
        "primary": "rgb(133, 83, 0)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(255, 221, 184)",
        "onPrimaryContainer": "rgb(42, 23, 0)",
        "secondary": "rgb(113, 90, 65)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(252, 221, 189)",
        "onSecondaryContainer": "rgb(40, 24, 5)",
        "tertiary": "rgb(84, 100, 61)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(215, 233, 184)",
        "onTertiaryContainer": "rgb(18, 31, 2)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(31, 27, 22)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(31, 27, 22)",
        "surfaceVariant": "rgb(241, 224, 208)",
        "onSurfaceVariant": "rgb(80, 69, 57)",
        "outline": "rgb(130, 117, 104)",
        "outlineVariant": "rgb(212, 196, 181)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(53, 47, 42)",
        "inverseOnSurface": "rgb(249, 239, 231)",
        "inversePrimary": "rgb(255, 185, 95)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(249, 243, 242)",
            "level2": "rgb(245, 238, 235)",
            "level3": "rgb(242, 233, 227)",
            "level4": "rgb(240, 231, 224)",
            "level5": "rgb(238, 228, 219)"
        },
        "surfaceDisabled": "rgba(31, 27, 22, 0.12)",
        "onSurfaceDisabled": "rgba(31, 27, 22, 0.38)",
        "backdrop": "rgba(56, 47, 36, 0.4)"
    }
}