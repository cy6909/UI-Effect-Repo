import { Button, Icon } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import { useColorModeValue } from '../../setup/color-mode';

const RefreshButton = ({ onClick }) => {
  const background = useColorModeValue('#ffffff', 'var(--surface-ghost)');
  const hoverBackground = useColorModeValue('#f7f7f8', 'var(--surface-ghost-hover)');
  const borderColor = useColorModeValue('#e4e4e7', 'var(--border-subtle)');
  const iconColor = useColorModeValue('#71717a', 'var(--text-muted)');
  const boxShadow = useColorModeValue('none', 'var(--surface-ghost-highlight)');
  const backdropFilter = useColorModeValue('none', 'var(--surface-ghost-blur)');

  return (
    <Button
      transition="transform var(--dur-press) var(--ease-out), background-color var(--dur-menu) var(--ease-out)"
      _active={{ bg: hoverBackground, transform: 'scale(0.94)' }}
      _hover={{ bg: hoverBackground }}
      bg={background}
      boxShadow={boxShadow}
      backdropFilter={backdropFilter}
      position="absolute"
      onClick={onClick}
      aria-label="Refresh animation"
      border="1px solid"
      borderColor={borderColor}
      zIndex={2}
      color={iconColor}
      rounded="10px"
      right={3}
      size="md"
      top={3}
      p={2}
    >
      <Icon as={FiRefreshCw} boxSize={4} />
    </Button>
  );
};

export default RefreshButton;
