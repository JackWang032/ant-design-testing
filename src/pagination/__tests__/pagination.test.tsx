import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Pagination } from 'antd';

import * as pagination from '../';

describe('Test Pagination', () => {
    beforeEach(() => {
        cleanup();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * @link query
     */
    it('query', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.query(container)).not.toBeNull();
    });

    /**
     * @link queryPrevButton
     */
    it('queryPrevButton', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryPrevButton(container)).not.toBeNull();
    });

    /**
     * @link queryNextButton
     */
    it('queryNextButton', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryNextButton(container)).not.toBeNull();
    });

    /**
     * @link queryPaginationItem
     */
    it('queryPaginationItem', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryPaginationItem(container, 1)).not.toBeNull();
    });

    /**
     * @link fireSizeChange
     */
    it('fireSizeChange', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onShowSizeChange={fn} />);
        pagination.fireSizeOpen(container);
        pagination.fireSizeChange(container, 1);
        expect(fn).toBeCalledWith(6, 20);
    });

    /**
     * @link fireChange
     */
    it('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(container);
        expect(fn).toBeCalledWith(2, 10);
    });

    it('fireChange with queryPrevButton', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(container);
        expect(fn).toBeCalledWith(2, 10);
        pagination.fireChange(pagination.queryPrevButton(container)!);
        expect(fn).toBeCalledWith(1, 10);
    });

    it('fireChange with specific item', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryPaginationItem(container, 3)!);
        expect(fn).toBeCalledWith(3, 10);
    });

    /**
     * @link queryJumpNext
     */
    it('fireChange with jump next', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryJumpNext(container)!);
        expect(fn).toBeCalledWith(6, 10);
    });

    /**
     * @link queryJumpPrev
     */
    it('fireChange with jump prev', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryJumpPrev(container)!);
        expect(fn).toBeCalledWith(1, 10);
    });

    /**
     * @link queryQuickJump
     */
    it('fireChange with quick jump', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onChange={fn} showQuickJumper />);
        pagination.fireChange(pagination.queryQuickJump(container)!, 20);
        expect(fn).toBeCalledWith(20, 10);
    });
});
