import { CSSTransition } from 'react-transition-group'
import cls from 'classnames'
import ReactModal from 'react-modal'
import { CloseButton } from '../Button'

const Drawer = ({ close, children, isOpen, contentLabel }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={close}
    contentLabel={contentLabel}
    className="ifu-drawer"
    overlayClassName="ifu-modal__overlay"
  >
    <div className="relative">
      <CSSTransition
        classNames={'ifu-drawer-'}
        timeout={5000}
        in={isOpen}
        appear
        mountOnEnter
      >
        <div className="ifu-drawer-body">
          <div className="mb-2 h-12">
            <CloseButton className="float-end me-6" close={close} />
          </div>
          {children}
        </div>
      </CSSTransition>
    </div>
  </ReactModal>
)

export const DropDownModal = ({ close, children, isOpen }) => {
  return (
    <>
      <div
        className={cls(
          ' hidden z-40 md:block absolute top-20 right-0 bottom-0 w-screen bg-black-op5 transition-opacity duration-200',
          {
            'opacity-0 h-0': !isOpen,
            'opacity-100 h-screen': isOpen,
          }
        )}
      ></div>
      <div
        className={cls('hidden md:block relative ', {
          'overflow-hidden': !isOpen,
        })}
      >
        <nav
          className={cls(
            'overflow-y-auto absolute md:-top-0 md:-left-44 xl:-left-48 z-50 w-screen md:w-drawer bg-white rounded shadow-dropdown'
          )}
        >
          <div className="mb-2 h-12">
            <CloseButton className="float-end me-6" close={close} />
          </div>
          {children}
        </nav>
      </div>
    </>
  )
}

export default Drawer