import { Query } from '../../types';
import { QueryParser } from '../QueryParser';

describe('QueryParser Test', () => {
  it('Lookup tables queries are processed as espected', () => {
    const queryString = 'from my.lookuplist.my_lookup_list';

    const query: Query = {
      queryString,
      dates: {
        from: new Date(2020, 1, 1).getMilliseconds(),
        to: new Date(2020, 1, 2).getMilliseconds(),
      },
    };

    const expectedDatesForLookupTable = QueryParser.getDateForLookupTable();

    const result = QueryParser.processQuery(query);

    expect(result.queryString).toBe('from my.lookuplist.my_lookup_list');
    expect(result.dates.from).toBe(expectedDatesForLookupTable.from);
    expect(result.dates.to).toBe(expectedDatesForLookupTable.to);
  });

  it('Normal tables queries are processed as espected', () => {
    const queryString = 'from my.table.mytable';
    const query: Query = {
      queryString,
      dates: {
        from: new Date(2020, 1, 1).getMilliseconds(),
        to: new Date(2020, 1, 2).getMilliseconds(),
      },
    };

    const result = QueryParser.processQuery(query);

    expect(result.queryString).toBe(queryString);
    expect(result.dates.from).toBe(query.dates.from);
    expect(result.dates.to).toBe(query.dates.to);
  });
});
