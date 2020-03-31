var _canvas
var cell_array = []

var grid_size = 50
var cell_size = 25
var total_cells

var stack = []
var current
var count = 1
var done_generating = false

var enable_visualization_gen = false
var enable_visualization_solve = false

p5.disableFriendlyErrors = true

function setup( )
{
    _canvas = createCanvas( grid_size * cell_size, grid_size * cell_size )
    current = createVector( 0, 0 )
    total_cells = grid_size * grid_size
    
    for ( i = 0; i < width / cell_size; i++ )
    {
        cell_array[ i ] = []
        for ( j = 0; j < height / cell_size; j++ )
        {
            cell_array[ i ][ j ] = new cell( i, j, cell_size )
        }
    }
    
    cell_array[ current.x ][ current.y ].set_visited( )
    stack.push( current )
    
    cell_array[ 0 ][ 0 ].g = 0
    cell_array[ 0 ][ 0 ].h = calc_heuristics( cell_array[ 0 ][ 0 ], cell_array[ grid_size - 1 ][ grid_size - 1 ] )
    open_set.push( cell_array[ 0 ][ 0 ] )
    
    end_point = cell_array[ grid_size - 1 ][ grid_size - 1 ]
    
    background( 55 )
    
    for ( i = 0; i < width / cell_size; i++ )
    {
        for ( j = 0; j < height / cell_size; j++ )
        {
            cell_array[ i ][ j ].update( current )
        }
    }
}

function draw( )
{
    var ms = millis( )
    if ( !stack.length )
        return
    
    current = backtracking( cell_array )
    
    if ( !done_generating )
    {
        if ( enable_visualization_gen )
        {
            if ( current.x == 0 && current.y == 0 )
            {
                current.x = current.y = -1
                done_generating = true
            }
            else
            {
                cell_array[ current.x ][ current.y ].update( current )
            }
        }
        else
        {  
            while( true )
            {
                current = backtracking( cell_array )
                
                if ( current.x == 0 && current.y == 0 )
                {
                    current.x = current.y = -1
                    done_generating = true
                    break
                }
            }
            
            for ( i = 0; i < width / cell_size; i++ )
            {
                for ( j = 0; j < height / cell_size; j++ )
                {
                    cell_array[ i ][ j ].update( current )
                }
            }
        }
    }

    if ( done_generating )
    {
        if ( !open_set.length )
        {
            noLoop( )
            return
        }
        
        if ( enable_visualization_solve )
        {
            var last = a_star( cell_array )
            
            for ( let i = 0; i < open_set.length; i++ )
            {
                if ( !open_set[ i ].updated_open )
                {
                    open_set[ i ].updated_open = true
                    open_set[ i ].set_color( color( 0, 0, 255 ) )
                    open_set[ i ].update( current )
                }
            }
            
            for ( let i = 0; i < closed_set.length; i++ )
            {
                //if ( !closed_set[ i ].updated_closed )
                //{
                //    closed_set[ i ].updated_closed = true
                    closed_set[ i ].set_color( color( 255, 0, 0 ) )
                    closed_set[ i ].update( current )
                //}
            }
            
            var prev = last
            
            if ( prev )
            {
                while( prev.previous )
                {
                    prev.set_color( color( 0, 255, 0 ) )
                    prev.update( current )
                    prev = prev.previous
                }
            }
        }
        else
        {
            while( true )
            {
                var last = a_star( cell_array )
                
                if ( last == end_point )
                {
                    var prev = last
                    
                    while( prev.previous )
                    {
                        prev.set_color( color( 0, 255, 0 ) )
                        prev.update( current )
                        prev = prev.previous
                    }
                    
                    break
                }
            }
        }
    }
    
    if ( last == end_point )
    {
       saveCanvas( _canvas, "solved_500x500", "jpg" )
       console.log( millis( ) - ms )
       noLoop( )
       return
    }
    
    
}