const createExistChecker = (allowedPages: Record<string, Set<string>>) => {
  return (page: string | null, section: string | null) => allowedPages[page ?? '']?.has(section ?? '') ?? false;
};

export const isTitleExist = createExistChecker({
  home: new Set(['1', '2', '3']),
  about_us: new Set(['1', '2']),
  our_service: new Set(['1', '2', '3']),
  profile: new Set(['1', '2', '3']),
});

export const isDescriptionExist = createExistChecker({
  home: new Set(['1', '2', '3']),
  about_us: new Set(['1', '2']),
  our_service: new Set(['1', '2', '3']),
  profile: new Set(['1', '2', '3']),
});

export const isImageExist = createExistChecker({
  home: new Set(['1', '2', '3']),
  about_us: new Set(['1', '2']),
  our_service: new Set(['2', '3']), // '1' is excluded
  profile: new Set(['1', '3', '4']),
});

export const isImage2Exist = createExistChecker({
  home: new Set([]),
  about_us: new Set(['2']),
  our_service: new Set([]),
  profile: new Set([]),
});
