import { computed, onMounted } from 'vue';
import { usePartsStore } from '@/stores/partsStore';

export default function useSearch(searchTerm) {
  const partsStore = usePartsStore();

  partsStore.getParts();

  const allParts = computed(() => (partsStore.parts
    ? [...partsStore.parts.heads,
      ...partsStore.parts.arms, ...partsStore.parts.torsos, ...partsStore.parts.bases]
    : []));

  const results = computed(() => {
    let searchResults;
    if (!searchTerm.value) searchResults = allParts.value;
    else {
      const lowerTerm = searchTerm.value.toLowerCase();
      searchResults = allParts.value.filter(
        (part) => part.title.toLowerCase().includes(lowerTerm),
      );
    }
    return [...searchResults];
  });

  onMounted(() => console.log('Mounted: useSearch'));

  return { searchResults: results };
}
