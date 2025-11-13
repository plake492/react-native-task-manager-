import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
  buttons: ReactNode;
  keyboardAware?: boolean;
  layoutWrapper?: ViewStyle;
}

export default function FormLayout({ children, buttons, layoutWrapper = {}, keyboardAware = false }: FormLayoutProps) {
  const content = (
    <View style={{ ...styles.wrapper, ...layoutWrapper }}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
      <View style={styles.buttonContainer}>{buttons}</View>
    </View>
  );

  if (keyboardAware) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{content}</TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    paddingTop: spacing.md
  },
  scrollContent: {
    paddingHorizontal: spacing.lg
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border
  }
});
