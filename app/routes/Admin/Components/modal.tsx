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
                <div>Editar reportes</div>
                <div>Hola mundo header</div>
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <input type="text" placeholder="" />
                </form>
              </ModalBody>
              <ModalFooter>
                <button color="btn-danger" onClick={onClose}>
                  Cerrar
                </button>
                <button color="btn-success" onClick={onClose}>
                  Guardar
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