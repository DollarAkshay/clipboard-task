const { extractPartitionKey } = require("./dpk");

describe("extractPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = extractPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the valid hex when given table data without partitionKey", () => {
    const trivialKey = extractPartitionKey({ test: "dara", test2: "someother data" });
		expect(trivialKey).not.toEqual("");
  });

  it('Returns the same partitionKey when given table data has partitionKey and the length of key is less than 256', () => {
		const trivialKey = extractPartitionKey({
			test: 'bar',
			partitionKey: 'data',
    });
    console.log(trivialKey);

		expect(trivialKey).toEqual('data');
  });

  it('Returns the same partitionKey when given table data has partitionKey and the length of key is equal to 256', () => {
		const partitionKeyWithLength256 =
			'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
    const trivialKey = extractPartitionKey({
      test: 'bar',
      partitionKey: partitionKeyWithLength256,
    });

		expect(trivialKey).toEqual(partitionKeyWithLength256);
  });
  it('Returns a valid hex when given table data has partitionKey and the length of key is more than 256', () => {
		const partitionKeyWithLength257 =
			'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
    const trivialKey = extractPartitionKey({
		test: 'bar',
		partitionKey: partitionKeyWithLength257,
	});
    expect(trivialKey).not.toBe(0);
    expect(trivialKey).not.toEqual("");
		expect(trivialKey).not.toEqual(partitionKeyWithLength257);
  });

  it('Returns the same partitionKey in String format when given table data has partitionKey(non string) and the length of key is less than 256', () => {
		const trivialKey = extractPartitionKey({
			test: 'bar',
			partitionKey: 123,
		});
		console.log(trivialKey);

		expect(trivialKey).toEqual("123");
  });

  it('Returns the same partitionKey in string format when given table data has partitionKey(non string) and the length of key is equal to 256', () => {
		const partitionKeyWithLength256 =
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
		const trivialKey = extractPartitionKey({
			test: 'bar',
			partitionKey: partitionKeyWithLength256,
		});

		expect(trivialKey).toEqual(JSON.stringify(partitionKeyWithLength256));
  });
  it('Returns a valid hex when given table data has partitionKey(non string) and the length of key is more than 256', () => {
		const partitionKeyWithLength257 =
			11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
		const trivialKey = extractPartitionKey({
			test: 'bar',
			partitionKey: partitionKeyWithLength257,
		});
		expect(trivialKey).not.toBe(0);
		expect(trivialKey).not.toEqual('');
		expect(trivialKey).not.toEqual(partitionKeyWithLength257);
  });
});
