import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchMainIngredients, fetchCuisines } from "@/supabase/services";
import { updateMetadataField, selectMetadata, setCurrentSection, toggleFilter } from "@/features/recipeForms";
import { setFilterList, ButtonRow } from "@/features/filters";
import { FilterOptionType } from '@/types';
import SectionWrapper from "../shared/SectionWrapper";
import { Input, ToggleButton, Heading, LoadingComponent, ErrorComponent, CircleMinus, CirclePlus, IconButton } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

type Props = {
  handleNavigation?: (action: () => void) => void
};

const MetaDataSection = ({ handleNavigation }: Props) => {

  const { language } = useLanguage()

  const metadata = useAppSelector(selectMetadata)
  const typeFilters = useAppSelector(state => state.filters.typeFilters);
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters);
  const errors = useAppSelector(state => state.recipeForms.errors)

  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState({
    title: metadata.title,
    description: metadata.description,
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFilterToggle = (filterCategory: "types" | "cuisines", filter: FilterOptionType) => {
    dispatch(toggleFilter({ filterCategory, filter }));
  };

  useEffect(() => {
    const shouldFetchTypes = typeFilters.length === 0;
    const shouldFetchCuisines = cuisineFilters.length === 0;

    if (!shouldFetchTypes && !shouldFetchCuisines) {
      setLoading(false);
      return;
    }

    const loadFilters = async () => {
      setError(false);
      setLoading(true);

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          fetchMainIngredients(),
          fetchCuisines(),
        ]);
        dispatch(setFilterList({ filterCategory: "types", list: typesResult }));
        dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult }));

      } catch (err) {
        console.error("Failed to fetch filter options", err);
        setError(true);
      }

      setLoading(false);
    };

    loadFilters();
  }, []);

  useEffect(() => {
    setLocalMetadata({
      title: metadata.title,
      description: metadata.description,
    });
  }, [metadata.title, metadata.description]);

  return (
    <SectionWrapper>
      <div className="flex justify-between">
        <Heading title={translateText('metadata', 'create', language)} />
        <div className="flex flex-col items-end pr-2">
          <span className="text-sm font-medium">{translateText('metadata', 'weekly', language)}</span>
          <ToggleButton
            isToggled={metadata.includeWeekly}
            onToggle={() => { dispatch(updateMetadataField({ key: "includeWeekly", value: !metadata.includeWeekly })) }}
          />
        </div>
      </div>

      <div className="h-[60vh] flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-2">
          {loading ?
            <LoadingComponent />
            :
            error ? <ErrorComponent />
              : <>
                <Input
                  required={true}
                  id="recipeTitle"
                  label={translateText("metadata", "title", language)}
                  placeholder="..."
                  value={localMetadata.title}
                  onChange={(e) =>
                    setLocalMetadata(prev => ({ ...prev, title: e.target.value }))
                  }
                  onBlur={() => {
                    if (localMetadata.title !== metadata.title) {
                      dispatch(updateMetadataField({ key: "title", value: localMetadata.title }));
                    }
                  }}
                  error={errors.title}
                />
                <Input
                  id="recipeDescription"
                  label={translateText("metadata", "description", language)}
                  multiline={true}
                  placeholder="..."
                  value={localMetadata.description ?? ""}
                  onChange={(e) =>
                    setLocalMetadata(prev => ({ ...prev, description: e.target.value }))
                  }
                  onBlur={() => {
                    if (localMetadata.description !== metadata.description) {
                      dispatch(updateMetadataField({ key: "description", value: localMetadata.description }));
                    }
                  }}
                />
                <div className={`flex justify-between items-center  rounded p-0.5 ${errors.servings ? 'border-red-600 border-2' : 'border border-primary-text'}`}>
                  <IconButton
                    className="p-1"
                    disabled={metadata.servings <= 0}
                    onClick={() => dispatch(updateMetadataField({ key: "servings", value: Math.max(0, metadata.servings - 1) }))}
                  >
                    <CircleMinus size="size-7" />
                  </IconButton>
                  <label className="label flex items-center gap-1">
                    <span>{translateText('metadata', 'servings', language)}</span>
                    <input
                      type="number"
                      name="servings"
                      required
                      tabIndex={-1}
                      value={metadata.servings}
                      min={1}
                      onChange={() => { }}
                      className="w-10 text-center label bg-transparent border-none pointer-events-none"
                    />
                  </label>
                  <IconButton
                    className="p-1"
                    disabled={metadata.servings >= 20}
                    onClick={() => dispatch(updateMetadataField({ key: "servings", value: Math.min(20, metadata.servings + 1) }))}
                  >
                    <CirclePlus size="size-7" />
                  </IconButton>
                </div>
                <div className="">
                  <Heading title={translateText("metadata", "selectCategory", language)} headingType="sub-heading" />
                  <ButtonRow
                    selected={metadata.types}
                    items={typeFilters}
                    onClick={(filter) => handleFilterToggle("types", filter)}
                    largePattern={true}
                  />
                </div>
                <div className="">
                  <Heading title={translateText("metadata", "selectCuisine", language)} headingType="sub-heading" />
                  <ButtonRow
                    selected={metadata.cuisines}
                    items={cuisineFilters}
                    onClick={(filter) => handleFilterToggle("cuisines", filter)}
                    reverse={true}
                  />
                </div>
              </>}
        </div>
      </div>
      {handleNavigation && (
        <div className="w-full flex justify-end space-x-2 lg:hidden">
          <button
            type="button"
            disabled={loading || error}
            className="w-1/2 bg-primary font-medium text-primary-text rounded disabled:opacity-50 button-click"
            onClick={() =>
              handleNavigation(() => dispatch(setCurrentSection("Ingredients")))
            }
          >
            {translateText("buttons", "next", language)}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default MetaDataSection;