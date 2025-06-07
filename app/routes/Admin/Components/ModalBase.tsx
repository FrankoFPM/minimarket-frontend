import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@heroui/react'

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ModalBase({ isOpen, onClose, title, children, footer }: ModalBaseProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      classNames={{
        backdrop: 'backdrop-blur-md'
      }}
    >
      <ModalContent className="max-w-lg">
        {() => (
          <>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
