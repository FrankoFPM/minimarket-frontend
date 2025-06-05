import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react'
import { forwardRef, useImperativeHandle } from 'react'

export interface ModalTestRef {
  openModal: () => void;
}

export const Modaltest = forwardRef<ModalTestRef>((props, ref) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useImperativeHandle(ref, () => ({
    openModal: () => {
      onOpen()
    }
  }))

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
                <div>Hola mundo header</div>
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <input type="text" placeholder="holamundo" />
                </form>
              </ModalBody>
              <ModalFooter>
                <button color="btn-danger" onClick={onClose}>
                  Close
                </button>
                <button color="btn-success" onClick={onClose}>
                  Action
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
})
Modaltest.displayName = 'Modaltest'