import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import * as filtersApi from "@/utils/backend/api/";
import { updateMetadataField, selectMetadata, setCurrentSection, toggleFilter } from "@/features/recipeForm";
import { setFilterList, FilterOptionType, ButtonRow } from "@/features/filters";
import SectionWrapper from "../shared/SectionWrapper";
import { Input, ToggleButton, Heading, LoadingComponent, ErrorComponent } from "@/components";
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
          filtersApi.getMainIngredients(language),
          filtersApi.getCuisines(language),
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
  }, [typeFilters, cuisineFilters]);


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
                <div className="">
                  <Heading title={translateText("metadata", "selectCategory", language)} headingType="sub-heading" />
                  <ButtonRow
                    selected={metadata.types}
                    items={typeFilters}
                    onClick={handleFilterToggle}
                    filterCategory="types"
                    largePattern={true}
                  />
                </div>
                <div className="">
                  <Heading title={translateText("metadata", "selectCuisine", language)} headingType="sub-heading" />
                  <ButtonRow
                    selected={metadata.cuisines}
                    items={cuisineFilters}
                    onClick={handleFilterToggle}
                    filterCategory="cuisines"
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
            className="w-1/2 bg-primary font-medium text-primary-text rounded disabled:opacity-50"
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