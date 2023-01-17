import './index.scss'
export default defineComponent({
  name: 'GlobalLoading',
  setup(props, {expose}) {

    let isShow = ref<boolean>(false)

    const show = () => {
      isShow.value = true
    }

    const hide = () => {
      isShow.value = false
    }

    expose({
      show,
      hide,
      isShow
    })

    return () => (
      <>
        {
          isShow.value && (
            <div class="global-loading">
              <span class="global-loading__text">Loading...</span>
            </div>
          )
        }
      </>
    )
  }
})