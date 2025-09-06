import { readonly, ref } from "vue"

const closedNotifications = ref<string[]>([])

export function useNotifications() {

    function remove(type: string) {
        closedNotifications.value = closedNotifications.value.filter((t) => t !== type)
    }
      
    function clearAll() {
        closedNotifications.value = []
    }
      
    function isNonEmpty() {
        return closedNotifications.value.length > 0
    }

    function add(type: string) {
        closedNotifications.value.push(type)
    }

    return {
        closedNotifications: readonly(closedNotifications),
        remove,
        clearAll,
        isNonEmpty,
        add
    }
}